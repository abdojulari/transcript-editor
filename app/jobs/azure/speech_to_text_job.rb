require 'open-uri'

module Azure
  class SpeechToTextJob < ApplicationJob
    queue_as :default

    def perform(transcript_id)
      transcript = Transcript.find transcript_id
      file = download(transcript.audio)
      return unless file
      transcript.update_columns(process_status: :processing)
      lines = Azure::SpeechToTextService.new(file: file).recognize
      ActiveRecord::Base.transaction do
        transcript.transcript_lines.clear
        lines.each do |line_attrbitues|
          transcript.transcript_lines.create line_attrbitues
        end
      end
      transcript.update_columns(
        process_status: :completed, process_message: nil
      )
    rescue Exception => e
      transcript.update_columns(
        process_status: :failed, process_message: e.message
      )
      Bugsnag.notify e
    ensure
      File.delete file if file && File.exist?(file)
    end

    def download(audio)
      sanitized_file = audio.file
      # copy the file to ./tmp folder
      Rails.root.join("tmp", sanitized_file.filename).tap do |path|
        sanitized_file.copy! path
      end
    end
  end
end
