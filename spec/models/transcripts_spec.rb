require "rails_helper"

RSpec.describe Transcript, type: :model do
  describe "associations" do
    it { is_expected.to have_many :transcript_lines }
    it { is_expected.to have_many :transcript_edits }
    it { is_expected.to have_many :transcript_speakers }
    it { is_expected.to belong_to :collection }
    it { is_expected.to belong_to :transcript_status }
    it { is_expected.to belong_to :vendor }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of :uid }
    it { is_expected.to validate_presence_of :vendor }
    it { is_expected.to validate_uniqueness_of :uid }
  end

  describe "validate uid does not change after create" do
    let(:vendor) { Vendor.create!(uid: 'voice_base', name: 'VoiceBase') }
    let(:transcript) do
      Transcript.new(
        uid: "transcript_test",
        vendor_id: vendor.id
      )
    end

    context "when transcript is created" do
      it "considers the transcript to be valid" do
        expect(transcript.save).to be true
      end
    end

    context "when transcript is updated" do
      it "considers the transcript to be invalid" do
        transcript.save
        expect(transcript.update(uid: "bad")).to be false
      end
    end
  end
end
