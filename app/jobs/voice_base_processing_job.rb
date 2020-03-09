class VoiceBaseProcessingJob < ApplicationJob
  queue_as :default

  def perform
    Transcript.voicebase_processing_pending.find_each do |transcript|
      ready = VoiceBase::VoicebaseApiService.check_progress(transcript.id)
      if ready
        transcript = Transcript.find(transcript.id)
        VoiceBase::VoicebaseApiService.process_transcript(transcript.id)
      end
    end
  end
end
