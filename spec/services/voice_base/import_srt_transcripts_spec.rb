require 'rails_helper'

RSpec.describe VoiceBase::ImportSrtTranscripts, type: :service do
  describe '.call' do
    let!(:vendor) { Vendor.create!(uid: 'voice_base', name: 'VoiceBase') }
    let!(:downloaded_transcript_status) { TranscriptStatus.create!(name: 'transcript_downloaded', progress: 30, description: 'Transcript has been downloaded') }
    let!(:initialized_transcript_line_status) { TranscriptLineStatus.create!(name: 'initialized', progress: 0, description: 'Line contains unedited computer-generated text. Please edit if incorrect!') }
    let!(:collection) { Collection.create!(uid: 'rainbow-archives', title: 'Rainbow Archives', description: 'The Rainbow Archives is a manuscript collection that was the result of an effort to preserve the culture of the alternative lifestyles movement in Australia that emerged in the 1960s and flourished into the 1990s.', url: nil, image_url: nil, vendor: vendor, vendor_identifier: 1, project_uid: 'nsw-state-library-amplify') }
    let!(:transcript) { Transcript.create!(uid: 'mloh103-tape0001-s001-m', title: 'Mloh 103 Tape 0001 S001 M', description: 'A description.', collection: collection, vendor: vendor, vendor_identifier: 'mloh103-tape0001-s001-m', batch_id: 'transcripts_seeds.csv', project_uid: 'nsw-state-library-amplify') }

    subject do
      # Need to use a lambda as the subject in order to support the RSpec one-line expectation syntax.
      lambda { VoiceBase::ImportSrtTranscripts.call(project_id: 'nsw-state-library-amplify') }
    end

    it { is_expected.to change { transcript.reload.transcript_lines.count }.from(0).to(274) }
    it { is_expected.to change { transcript.reload.lines }.from(0).to(274) }
    it { is_expected.to change { transcript.reload.transcript_status.try(:name) }.from(nil).to('transcript_downloaded') }
    it { is_expected.to change { transcript.reload.duration }.from(0).to(1878) }
    it { is_expected.to change { transcript.reload.transcript_retrieved_at }.from(nil).to(an_instance_of(ActiveSupport::TimeWithZone)) }

    it 'creates transcript lines holding the values for each line' do
      subject.call

      transcript_line = transcript.transcript_lines.first

      expect(transcript_line.sequence).to eq 0
      expect(transcript_line.speaker_id).to eq 0
      expect(transcript_line.start_time).to eq 1580
      expect(transcript_line.end_time).to eq 26070
      expect(transcript_line.original_text).to eq "I've never seen it with the speed just as you. And i k. I'm jenny del i lived at nimbin for eleven years."
    end
  end
end
