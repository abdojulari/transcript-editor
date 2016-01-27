class Transcript < ActiveRecord::Base

  include PgSearch
  multisearchable :against => [:title, :description]

  belongs_to :collection
  belongs_to :vendor
  belongs_to :transcript_status
  has_many :transcript_lines
  has_many :transcript_edits

  self.per_page = 500

  def self.getForHomepage(page)
    Transcript.where("lines > 0").paginate(:page => page).order(:title)
  end

  def self.getForDownloadByVendor(vendor_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND collections.vendor_id = :vendor_id AND transcripts.lines <= 0 AND collections.vendor_identifier != :empty AND transcripts.vendor_identifier != :empty",
      {vendor_id: vendor[:id], empty: ""})
  end

  def self.getForUploadByVendor(vendor_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND collections.vendor_id = :vendor_id AND transcripts.lines <= 0 AND collections.vendor_identifier != :empty",
      {vendor_id: vendor[:id], empty: ""})
  end

  def updateFromHash(contents)
    transcript_lines = _getLinesFromHash(contents)
    if transcript_lines.length > 0
      # remove existing lines
      TranscriptLine.destroy_all(:transcript_id => id)

      # create the lines
      TranscriptLine.create(transcript_lines)

      # update transcript
      transcript_status = TranscriptStatus.find_by_name("transcript_downloaded")
      transcript_duration = _getDurationFromHash(contents)
      update_attributes(lines: transcript_lines.length, transcript_status_id: transcript_status[:id], duration: transcript_duration, transcript_retrieved_at: DateTime.now)
      puts "Created #{transcript_lines.length} lines from transcript #{uid}"

    # transcript is still processing
    elsif contents["audio_files"] && contents["audio_files"].length > 0
      transcript_status = TranscriptStatus.find_by_name("transcript_processing")
      update_attribute(transcript_status_id: transcript_status[:id])
      puts "Transcript #{uid} still processing with status: #{contents["audio_files"][0]["current_status"]}"

    # no audio recognized
    else
      puts "Transcript #{uid} still processing (no audio file found)"
    end
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
