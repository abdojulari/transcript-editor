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

  describe "#speakers" do
    let(:vendor) { Vendor.create(uid: 'voice_base', name: 'VoiceBase') }
    let(:institution) { FactoryBot.create :institution }
    let(:collection) do
      Collection.create!(
        description: "A summary of the collection's content",
        url: "collection_catalogue_reference",
        uid: "collection-uid",
        title: "The collection's title",
        vendor: vendor,
        institution_id: institution.id
      )
    end
    let(:transcript) do
      Transcript.create!(
        uid: "test_transcript",
        vendor: vendor,
        collection: collection
      )
    end

    context "when the transcript has no speakers" do
      it "returns a blank string" do
        expect(transcript.speakers).to eq("")
      end
    end

    context "when the transcript has speakers" do
      it "returns the associated speaker" do
        transcript.speakers = "Mojo Jojo;"
        transcript.save
        expect(transcript.speakers).to eq("Mojo Jojo; ")
      end

      it "returns all associated speakers" do
        transcript.speakers = "Bubbles Puff; Blossom Puff;"
        transcript.save
        expect(transcript.speakers).to eq("Bubbles Puff; Blossom Puff; ")
      end
    end
  end

  # rubocop:disable RSpec/PredicateMatcher
  describe "#publish" do
    let(:publish) { nil }
    let!(:transcript) { FactoryBot.create :transcript, publish: publish }

    context "when default transcripts are unpublished" do
      it "checks the default transcript status" do
        expect(transcript.published?).to be_falsy
      end
    end

    context "when saving with publish true makes the:transcript to publish" do
      let!(:publish) { 1 }

      it "publishes the transcript" do
        expect(transcript.published?).to be_truthy
      end
    end

    context "when calling publish! makes the:transcript to publish" do
      it "publishes the transcript" do
        expect { transcript.publish! }.
          to change(transcript, :published?).from(false).to(true)
      end
    end
  end

  describe "#unpublish" do
    let!(:transcript) { FactoryBot.create :transcript, :published}

    it "unpublishes the transcript" do
      expect { transcript.unpublish! }.
        to change(transcript, :published?).from(true).to(false)
    end
  end
  # rubocop:enable RSpec/PredicateMatcher
end
