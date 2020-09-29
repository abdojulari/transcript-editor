require 'rails_helper'

RSpec.describe Azure::SpeechToTextJob do
  let(:transcript) { create :transcript, audio: fixture_file_upload("spec/fixtures/files/speech_to_text/aboutSpeechSdk.mp3") }
  let(:status) { double("command execution status", :success? => true) }

  describe '#recognize' do
    before do
      stub_audio_file_convert
    end

    it 'returns the lines' do
      stub_azure_speech_to_text status: status
      described_class.perform_now transcript.id
      transcript.reload
      expect(transcript.process_status).to eq 'completed'
      expect(transcript.transcript_lines.count).to eq 5
      expect(transcript.transcript_lines.first.text).to eq "the speech SDK exposes many features from the speech service but not all of them"
    end

    context 'when there is error' do
      let(:status) { double("command execution status", :success? => false) }

      it 'raises the error' do
        stub_azure_speech_to_text status: status, error_message: "something is wrong"
        described_class.perform_now transcript.id
        transcript.reload
        expect(transcript.process_status).to eq 'failed'
        expect(transcript.process_message).to eq 'something is wrong'
        expect(transcript.transcript_lines.count).to eq 0
      end
    end
  end
end
