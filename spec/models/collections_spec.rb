RSpec.describe Collection, type: :model do
  let(:vendor) { Vendor.create(uid: "voice_base", name: "VoiceBase") }
  let(:institution) { FactoryBot.create :institution }
  let!(:collection) do
    Collection.create!(
      description: "A summary of the collection's content",
      url: "collection_catalogue_reference",
      uid: "collection-uid",
      title: "The collection's title",
      vendor: vendor,
      institution_id: institution.id,
    )
  end

  describe "associations" do
    it { is_expected.to have_many :transcripts }
    it { is_expected.to belong_to :vendor }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of :vendor }
    it { is_expected.to validate_presence_of :description }
    it { is_expected.to validate_presence_of :uid }
    it { is_expected.to validate_presence_of :title }

    it { is_expected.to validate_uniqueness_of :uid }
    it { is_expected.to validate_uniqueness_of :title }
  end

  describe "#to_param" do
    it "returns the collection's uid" do
      expect(collection.to_param).to eq("collection-uid")
    end
  end

  describe "#published?" do
    it "confirms that the collection has a published_at date" do
      collection.update!(published_at: Time.current)
      expect(collection).to be_published
    end

    it "confirms that the collection has not been published" do
      collection.update!(published_at: nil)
      expect(collection).not_to be_published
    end
  end

  describe "validate uid does not change after create" do
    let(:vendor) { Vendor.create!(uid: "voice_base", name: "VoiceBase") }
    let(:collection) do
      Collection.new(
        uid: "collection_test",
        title: "test collection",
        url: "https://catalogue_collection",
        description: "test collection",
        vendor_id: vendor.id,
        institution_id: institution.id,
      )
    end

    context "when the collection has not yet been saved" do
      it "is valid" do
        expect(collection).to be_valid
      end
    end

    context "when the collection is already persisted" do
      before do
        collection.save!
      end

      it "is invalid" do
        collection.uid = "new_value"
        expect(collection).not_to be_valid
        expect(collection.errors[:uid].first).to eq("cannot be updated")
      end
    end
  end

  describe "#destroy" do
    let!(:collection) { FactoryBot.create :collection }

    before do
      transcript = FactoryBot.create :transcript, collection: collection
      FactoryBot.create :transcript_line, transcript: transcript
      FactoryBot.create :transcript_speaker,
                        transcript: transcript,
                        collection_id: collection.id
    end

    # rubocop:disable RSpec/ExampleLength
    it "deletes all related associations" do
      lines = TranscriptLine.
        where(transcript_id: collection.transcripts.first.id)
      spekers = TranscriptSpeaker.
        where(transcript_id: collection.transcripts.first.id)

      expect(collection.transcripts.count).to eq(1)
      expect(lines.count).to eq(1)
      expect(spekers.count).to eq(1)

      collection.destroy

      expect(Transcript.where(collection_id: collection.id).count).to eq(0)
      expect(lines.count).to eq(0)
      expect(spekers.count).to eq(0)
    end
    # rubocop:enable RSpec/ExampleLength
  end

  # rubocop:disable RSpec/PredicateMatcher
  describe "#publish" do
    let(:publish) { nil }
    let!(:collection) { FactoryBot.create :collection, publish: publish }

    context "when default collections are unpublished" do
      it "checks the default collection status" do
        expect(collection.published?).to be_falsy
      end
    end

    context "when saving with publish true makes the collection to publish" do
      let!(:publish) { 1 }

      it "publishes the collection" do
        expect(collection.published?).to be_truthy
      end
    end

    context "when calling publish! makes the collection to publish" do
      it "publishes the collection" do
        expect { collection.publish! }.
          to change(collection, :published?).from(false).to(true)
      end
    end
  end
  # rubocop:enable RSpec/PredicateMatcher
end
