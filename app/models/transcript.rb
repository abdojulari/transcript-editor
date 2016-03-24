class Transcript < ActiveRecord::Base

  include PgSearch
  multisearchable :against => [:title, :description]

  validates_uniqueness_of :uid

  belongs_to :collection
  belongs_to :vendor
  belongs_to :transcript_status
  has_many :transcript_lines
  has_many :transcript_edits
  has_many :transcript_speakers

  def to_param
    uid
  end

  def self.getEdited
    Transcript.joins(:transcript_edits).distinct
  end

  def self.getByUserEdited(user_id)
    Transcript
      .joins(:transcript_edits)
      .where(transcript_edits: {user_id: user_id}).distinct
  end

  def self.getForHomepage(page=1, options={})
    page ||= 1
    options[:order] ||= "title"
    project = Project.getActive

    per_page = 500
    per_page = project[:data]["transcriptsPerPage"].to_i if project && project[:data]["transcriptsPerPage"]

    Rails.cache.fetch("#{ENV['PROJECT_ID']}/transcripts/#{page}/#{per_page}/#{options[:order]}", expires_in: 10.minutes) do
      Transcript
        .select('transcripts.*, COALESCE(collections.title, \'\') as collection_title')
        .joins('LEFT OUTER JOIN collections ON collections.id = transcripts.collection_id')
        .where("transcripts.lines > 0 AND transcripts.project_uid = :project_uid", {project_uid: ENV['PROJECT_ID']})
        .paginate(:page => page, :per_page => per_page).order("transcripts.#{options[:order]}")
    end
  end

  def self.getForDownloadByVendor(vendor_uid, project_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND collections.vendor_id = :vendor_id AND transcripts.lines <= 0 AND collections.vendor_identifier != :empty AND transcripts.vendor_identifier != :empty AND transcripts.project_uid = :project_uid",
      {vendor_id: vendor[:id], empty: "", project_uid: project_uid})
  end

  def self.getForUpdateByVendor(vendor_uid, project_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND collections.vendor_id = :vendor_id AND collections.vendor_identifier != :empty AND transcripts.vendor_identifier != :empty AND transcripts.project_uid = :project_uid",
      {vendor_id: vendor[:id], empty: "", project_uid: project_uid})
  end

  def self.getForUploadByVendor(vendor_uid, project_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND transcripts.vendor_identifier = :empty AND collections.vendor_id = :vendor_id AND transcripts.lines <= 0 AND collections.vendor_identifier != :empty AND transcripts.project_uid = :project_uid",
      {vendor_id: vendor[:id], empty: "", project_uid: project_uid})
  end

  # Incrementally update transcript stats based on line delta
  def delta(line_status_id_before, line_status_id_after, statuses=nil)
    return if lines <= 0

    statuses ||= TranscriptLineStatus.allCached

    # initialize stats
    changed = false
    new_lines_completed = lines_completed
    new_lines_edited = lines_edited
    new_percent_completed = percent_completed
    new_percent_edited = percent_edited

    # retrieve statuses
    before_status = statuses.find{|s| s[:id]==line_status_id_before}
    after_status = statuses.find{|s| s[:id]==line_status_id_after}

    # Case: initialized before, something else after, increment lines edited
    if (!before_status || before_status.name=="initialized") && after_status && after_status.name!="initialized"
      new_lines_edited += 1
      changed = true
    end

    # Case: not completed before, completed after
    if (!before_status || before_status.name!="completed") && after_status && after_status.name=="completed"
      new_lines_completed += 1
      changed = true

    # Case: completed before, not completed after
    elsif before_status && before_status.name=="completed" && (!after_status || after_status.name!="completed")
      new_lines_completed -= 1
      changed = true
    end

    # Update
    if changed
      new_percent_edited = (1.0 * new_lines_edited / lines * 100).round.to_i
      new_percent_completed = (1.0 * new_lines_completed / lines * 100).round.to_i

      update_attributes(lines_edited: new_lines_edited, lines_completed: new_lines_completed, percent_edited: new_percent_edited, percent_completed: new_percent_completed)
    end
  end

  def loadFromHash(contents)
    transcript_lines = _getLinesFromHash(contents)
    if transcript_lines.length > 0
      # remove existing lines
      TranscriptLine.destroy_all(:transcript_id => id)

      # create the lines
      TranscriptLine.create(transcript_lines)

      # update transcript
      transcript_status = TranscriptStatus.find_by_name("transcript_downloaded")
      transcript_duration = _getDurationFromHash(contents)
      vendor_audio_urls = _getAudioUrlsFromHash(contents)

      update_attributes(lines: transcript_lines.length, transcript_status_id: transcript_status[:id], duration: transcript_duration, vendor_audio_urls: vendor_audio_urls, transcript_retrieved_at: DateTime.now)
      puts "Created #{transcript_lines.length} lines from transcript #{uid}"

    # transcript is still processing
    elsif contents["audio_files"] && contents["audio_files"].length > 0
      transcript_status = TranscriptStatus.find_by_name("transcript_processing")
      update_attributes(transcript_status_id: transcript_status[:id])
      puts "Transcript #{uid} still processing with status: #{contents["audio_files"][0]["current_status"]}"

    # no audio recognized
    else
      puts "Transcript #{uid} still processing (no audio file found)"
    end
  end

  def recalculate
    return if lines <= 0

    # Find all the edited lines
    edited_lines = TranscriptLine.getEditedByTranscriptId(id)

    # And all the completed lines
    completed_status = TranscriptLineStatus.find_by name: "completed"
    completed_lines = edited_lines.select{|s| s[:transcript_line_status_id]==completed_status.id}

    # Calculate
    _lines_edited = edited_lines.length
    _lines_completed = completed_lines.length
    _percent_edited = (1.0 * _lines_edited / lines * 100).round.to_i
    _percent_completed = (1.0 * _lines_completed / lines * 100).round.to_i

    # Update
    update_attributes(lines_edited: _lines_edited, lines_completed: _lines_completed, percent_edited: _percent_edited, percent_completed: _percent_completed)
  end

  def updateFromHash(contents)
    vendor_audio_urls = _getAudioUrlsFromHash(contents)
    update_attributes(vendor_audio_urls: vendor_audio_urls)
  end

  def _getAudioUrlsFromHash(contents)
    audio_urls = []
    if contents["audio_files"] && contents["audio_files"].length > 0
      audio_urls = contents["audio_files"][0]["url"].to_json
    end
    audio_urls
  end

  def _getDurationFromHash(contents)
    audio_duration = 0
    if contents["audio_files"] && contents["audio_files"].length > 0 && contents["audio_files"][0]["duration"]
      audio_duration = contents["audio_files"][0]["duration"].to_i
    end
    audio_duration
  end

  def _getLinesFromHash(contents)
    transcript_lines = []
    if contents["audio_files"] && contents["audio_files"].length > 0 && contents["audio_files"][0]["transcript"] && contents["audio_files"][0]["transcript"]["parts"] && contents["audio_files"][0]["transcript"]["parts"].length > 0
      raw_lines = contents["audio_files"][0]["transcript"]["parts"]
      raw_lines.each_with_index do |raw_line, i|
        transcript_lines << {
          :transcript_id => id,
          :start_time => (raw_line["start_time"].to_f * 1000).to_i,
          :end_time => (raw_line["end_time"].to_f * 1000).to_i,
          :original_text => raw_line["text"],
          :sequence => i,
          :speaker_id => raw_line["speaker_id"].to_i
        }
      end
    end
    transcript_lines
  end

end
