module VoiceBase
  class ImportSrtTranscripts
    def self.call(project_id:)
      new(project_id: project_id).send(:call)
    end

    def initialize(project_id:)
      @project_id = project_id
    end

    private

    def call
      # Retrieve empty transcripts that have VoiceBase as their vendor.
      transcripts = Transcript.getForDownloadByVendor('voice_base', @project_id)
      puts "Retrieved #{transcripts.count} empty transcripts from collections with VoiceBase as their vendor."

      transcripts.find_each do |transcript|
        transcript_file = Rails.root.join('project', @project_id, 'transcripts', 'voice_base', "#{transcript.vendor_identifier}.srt")

        unless File.exist?(transcript_file)
          puts "Couldn't find transcript in project folder for Transcript ##{transcript.id} at #{transcript_file}."
          next
        end

        load_from_file(transcript, transcript_file)
      end
    end

    def load_from_file(transcript, transcript_file)
      contents = File.read(transcript_file).lines
      transcript_lines = get_transcript_lines_from_file(transcript, contents)

      transcript_duration = transcript_lines.last[:end_time]
      vendor_audio_urls = []

      transcript_status = TranscriptStatus.find_by(name: :transcript_downloaded)

      TranscriptLine.where(transcript_id: transcript.id).destroy_all

      TranscriptLine.create!(transcript_lines)

      transcript.update!(lines: transcript_lines.count, transcript_status: transcript_status, duration: transcript_duration, vendor_audio_urls: vendor_audio_urls, transcript_retrieved_at: DateTime.now)

      puts "Created #{transcript_lines.length} lines from transcript #{transcript.uid}."
    end

    def get_transcript_lines_from_file(transcript, contents)
      [].tap do |transcript_lines|
        while contents.any?
          line = contents.shift(4)
          line.each(&:chomp!)

          line_number = line.shift.to_i
          start_time, end_time = line.shift.split('-->').each(&:strip!)
          line_text = line.shift

          transcript_lines << {
            transcript_id: transcript.id,
            start_time: convert_time_to_milliseconds(start_time),
            end_time: convert_time_to_milliseconds(end_time),
            original_text: line_text,
            sequence: (line_number - 1)
          }
        end
      end
    end

    def convert_time_to_milliseconds(time)
      ((Time.strptime(time, '%H:%M:%S,%L') - Time.now.at_midnight) * 1000).to_i
    end
  end
end
