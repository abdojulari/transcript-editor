require 'open-uri'

module Azure
  class SpeechToTextJob < ApplicationJob
    queue_as :default

    def perform(transcript_id)
      transcript = Transcript.find transcript_id
      return if transcript.process_started?

      file = download(transcript.audio)
      return unless file

      transcript.update_columns(
        process_status: :started,
        process_message: nil,
        process_started_at: Time.current
      )

      speech_to_text = Azure::SpeechToTextService.new(file: file).recognize
      lines = speech_to_text.lines
      wav_file = File.open(speech_to_text.wav_file_path)

      if transcript.transcript_lines.count == 0
        ActiveRecord::Base.transaction do
          transcript.transcript_lines.clear
          lines.each do |line_attrbitues|
            transcript.transcript_lines.create(line_attrbitues)
          end
          transcript.update_columns(
            lines: lines.length,
            duration: `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 #{file.to_s}`.to_i,
          )
        end
      end

      transcript.update(audio: wav_file)
      transcript.update_columns(
        process_status: :completed,
        process_message: nil,
        process_completed_at: Time.current
      )
    rescue Exception => e
      transcript.update_columns(
        process_status: :failed,
        process_message: e.message
      )
      Bugsnag.notify e
    ensure
      File.delete file if file && File.exist?(file)
      File.delete speech_to_text&.wav_file_path if File.exist?(speech_to_text&.wav_file_path.to_s)
    end

    def download(audio)
      audio.cache_stored_file!
      Rails.root.join(
        "public", audio.cache_dir, audio.cached?, audio.sanitized_file.filename
      )
    end
  end
end
