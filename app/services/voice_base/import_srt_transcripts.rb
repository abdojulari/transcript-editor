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

      unless transcript_lines.nil?
        transcript_duration = transcript_lines.last[:end_time] / 1000 # From milliseconds to seconds.
        vendor_audio_urls = []

        transcript_status = TranscriptStatus.find_by(name: :transcript_downloaded)

        TranscriptLine.where(transcript_id: transcript.id).destroy_all

        TranscriptLine.create!(transcript_lines)

        transcript.update!(lines: transcript_lines.count, transcript_status: transcript_status, duration: transcript_duration, vendor_audio_urls: vendor_audio_urls, transcript_retrieved_at: DateTime.now)

        puts "Created #{transcript_lines.length} lines from transcript #{transcript.uid}."
      else
        puts "No lines read from transcript #{transcript.uid}."
      end
    end

    def get_transcript_lines_from_file(transcript, contents)
      to_from_match = /^(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)$/
      whitespace_only = /^\s*$/

      out = [].tap do |transcript_lines|
        # Use line_number and line_temp to store the current state.
        line_number = 1
        line_temp = {
          reading: false,
          from: nil,
          to: nil,
          lines: []
        }

        # Use this lambda to insert into the transcript.
        insert_into_transcript = lambda {
          transcript_lines << {
            transcript_id: transcript.id,
            start_time: line_temp[:from],
            end_time: line_temp[:to],
            original_text: line_temp[:lines].join(' '),
            sequence: (line_number - 1)
          }
          line_number += 1
        }

        reset_reading = lambda {
          line_temp = {
            reading: false,
            from: nil,
            to: nil,
            lines: []
          }
        }

        start_reading = lambda { |from_text, to_text|
          line_temp = {
            reading: true,
            from: convert_time_to_milliseconds(from_text),
            to: convert_time_to_milliseconds(to_text),
            lines: []
          }
        }

        # Move to the next line when there's a to & from timestamp.
        while contents.any?
          newline = contents.shift

          # First, we test if the new line contains from/to timestamps,
          # and if so, start reading.
          try_match_to_from = to_from_match.match newline
          unless try_match_to_from.nil?
            # If a valid match for the timestamp, we need to save all
            # existing line data, and start a new line.
            if line_temp[:reading]
              # If we're still reading, add the existing data
              # to the transcript right away.
              insert_into_transcript.call
            end

            start_reading.call(try_match_to_from[1], try_match_to_from[2])
          else
            # Otherwise, we add more content to the existing line,
            # but only if we are actively reading.
            if line_temp[:reading]
              if newline.length > 0 && !(whitespace_only =~ newline)
                # Add the new line to the list of ingested lines.
                line_temp[:lines] << newline
              else
                # The current line is whitespace or empty.
                # Add the ingested line to the transcript,
                # and carry on.
                insert_into_transcript.call
                reset_reading.call
              end
            end
          end
        end

        # When we've finished parsing the document,
        # if we were still reading content,
        # read that line into the transcript.
        if line_temp[:reading]
          insert_into_transcript.call
        end
      end

      out
    end

    def convert_time_to_milliseconds(time)
      ((Time.strptime(time, '%H:%M:%S,%L') - Time.now.at_midnight) * 1000).to_i
    end
  end
end
