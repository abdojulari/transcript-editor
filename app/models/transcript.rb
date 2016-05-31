class Transcript < ActiveRecord::Base

  include PgSearch
  multisearchable :against => [:title, :description]
  pg_search_scope :search_default, :against => [:title, :description]
  pg_search_scope :search_by_title, :against => :title

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
        .where("transcripts.lines > 0 AND transcripts.project_uid = :project_uid AND transcripts.is_published = :is_published", {project_uid: ENV['PROJECT_ID'], is_published: 1})
        .paginate(:page => page, :per_page => per_page).order("transcripts.#{options[:order]}")
    end
  end

  def self.getForDownloadByVendor(vendor_uid, project_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND transcripts.lines <= 0 AND collections.vendor_identifier != :empty AND transcripts.vendor_identifier != :empty AND transcripts.project_uid = :project_uid",
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

  def self.getUpdatedAfter(date, page=1, options={})
    page ||= 1
    project = Project.getActive
    per_page = 500
    per_page = project[:data]["transcriptsPerPage"].to_i if project && project[:data]["transcriptsPerPage"]

    Transcript
      .select('transcripts.*, COALESCE(collections.uid, \'\') AS collection_uid')
      .joins('LEFT OUTER JOIN collections ON collections.id = transcripts.collection_id')
      .where("transcripts.lines > 0 AND transcripts.project_uid = :project_uid AND transcripts.is_published = :is_published AND transcripts.updated_at > :update_after", {project_uid: ENV['PROJECT_ID'], is_published: 1, update_after: date})
      .distinct
      .order("updated_at DESC")
      .paginate(:page => page, :per_page => per_page)
  end

  # Incrementally update transcript stats based on line delta
  def delta(line_status_id_before, line_status_id_after, statuses=nil)
    return if lines <= 0

    statuses ||= TranscriptLineStatus.allCached

    # initialize stats
    changed = false
    new_lines_completed = lines_completed
    new_lines_edited = lines_edited
    new_lines_reviewing = lines_reviewing
    new_percent_completed = percent_completed
    new_percent_edited = percent_edited
    new_percent_reviewing = percent_reviewing

    # retrieve statuses
    before_status = statuses.find{|s| s[:id]==line_status_id_before}
    after_status = statuses.find{|s| s[:id]==line_status_id_after}

    # Case: initialized before, something else after, increment lines edited
    if (!before_status || before_status.name!="editing") && after_status && after_status.name=="editing"
      new_lines_edited += 1
      changed = true

    # Case: edited before, not edited after
    elsif before_status && before_status.name=="editing" && (!after_status || after_status.name!="editing")
      new_lines_edited -= 1
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

    # Case: not reviewing before, reviewing after
    if (!before_status || before_status.name!="reviewing") && after_status && after_status.name=="reviewing"
      new_lines_reviewing += 1
      changed = true

    # Case: reviewing before, not reviewing after
    elsif before_status && before_status.name=="reviewing" && (!after_status || after_status.name!="reviewing")
      new_lines_reviewing -= 1
      changed = true
    end

    # Update
    if changed
      new_percent_edited = (1.0 * new_lines_edited / lines * 100).round.to_i
      new_percent_completed = (1.0 * new_lines_completed / lines * 100).round.to_i
      new_percent_reviewing = (1.0 * new_lines_reviewing / lines * 100).round.to_i

      update_attributes(lines_edited: new_lines_edited, lines_completed: new_lines_completed, lines_reviewing: new_lines_reviewing, percent_edited: new_percent_edited, percent_completed: new_percent_completed, percent_reviewing: new_percent_reviewing)
    end
  end

  def getUsersContributedCount(edits=[])
    if edits.length > 0
      edits.collect {|edit|
        if edit.user_id > 0
          edit.user_id.to_s
        else
          edit.session_id
        end
      }.uniq.length
    else
      TranscriptEdit
        .select("CASE WHEN user_id=0 THEN session_id ELSE to_char(user_id, '999999999999999') END")
        .where(transcript_id: id).distinct.count
    end
  end

  def loadFromHash(contents)

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

  def loadFromWebVTT(webvtt)
    transcript_lines = _getLinesFromWebVTT(webvtt)

    if transcript_lines.length > 0
      # remove existing lines
      TranscriptLine.destroy_all(:transcript_id => id)

      # create the lines
      TranscriptLine.create(transcript_lines)

      # update transcript
      transcript_status = TranscriptStatus.find_by_name("transcript_downloaded")
      transcript_duration = _getDurationFromWebVTT(webvtt)

      update_attributes(lines: transcript_lines.length, transcript_status_id: transcript_status[:id], duration: transcript_duration, transcript_retrieved_at: DateTime.now)
      puts "Created #{transcript_lines.length} lines from transcript #{uid}"
    end
  end

  def recalculate
    return if lines <= 0

    # Find all the edited lines
    edited_lines = TranscriptLine.getEditedByTranscriptId(id)

    # And all the completed/reviewing lines
    statuses = TranscriptLineStatus.allCached
    completed_status = statuses.find{|s| s[:name]=="completed"}
    completed_lines = edited_lines.select{|s| s[:transcript_line_status_id]==completed_status[:id]}
    reviewing_status = statuses.find{|s| s[:name]=="reviewing"}
    reviewing_lines = edited_lines.select{|s| s[:transcript_line_status_id]==reviewing_status[:id]}

    # Calculate
    _lines_edited = edited_lines.length
    _lines_completed = completed_lines.length
    _lines_reviewing = reviewing_lines.length
    _percent_edited = (1.0 * _lines_edited / lines * 100).round.to_i
    _percent_completed = (1.0 * _lines_completed / lines * 100).round.to_i
    _percent_reviewing = (1.0 * _lines_reviewing / lines * 100).round.to_i

    # Get user count
    _users_contributed = getUsersContributedCount()

    # Update
    update_attributes(lines_edited: _lines_edited, lines_completed: _lines_completed, lines_reviewing: _lines_reviewing, percent_edited: _percent_edited, percent_completed: _percent_completed, percent_reviewing: _percent_reviewing, users_contributed: _users_contributed)
  end

  def updateFromHash(contents)
    vendor_audio_urls = _getAudioUrlsFromHash(contents)
    update_attributes(vendor_audio_urls: vendor_audio_urls)
  end

  def updateUsersContributed(edits=[])
    _users_contributed = getUsersContributedCount(edits)

    if _users_contributed != users_contributed
      update_attributes(users_contributed: _users_contributed)
    end
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

  def _getDurationFromWebVTT(webvtt)
    duration = 0
    unless webvtt.cues.empty?
      duration = (webvtt.cues.last.end_in_sec * 1000).to_i
    end
    duration
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

  def _getLinesFromWebVTT(webvtt)
    transcript_lines = []
    webvtt.cues.each_with_index do |cue, i|
      # Remove speakers from lines
      text = cue.text.gsub(/^<v [^>]*>[ ]*/, "")
      # Add to lines
      transcript_lines << {
        :transcript_id => id,
        :start_time => (cue.start_in_sec * 1000).to_i,
        :end_time => (cue.end_in_sec * 1000).to_i,
        :original_text => text,
        :sequence => i
      }
    end
    transcript_lines
  end

end
