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

    it { is_expected.to validate_length_of(:uid).is_at_most(30) }

    it { is_expected.to allow_value("abc_def").for(:uid) }
    it { is_expected.to allow_value("abc_d_e-f").for(:uid) }

    it { is_expected.not_to allow_value("abc def").for(:uid) }
    it { is_expected.not_to allow_value("").for(:uid) }
    it { is_expected.not_to allow_value("ab&ef").for(:uid) }

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

  describe "#get_for_home_page" do
    let(:params) do
      { collection_id: 0, sort_id: sort_id, text: "", institution_id: 0, theme: "" }
    end

    before do
      %w[B A].each do |title|
        collection =  create :collection, :published
        create :transcript, :published,
          title: title,
          collection: collection,
          project_uid: 'nsw-state-library-amplify',
          lines: 1
      end
    end

    context "when sorting by title A-Z" do
      let!(:sort_id) { "title_asc" }

      it "sorts the records" do
        expect(described_class.get_for_home_page(params).map(&:title)).to eq(["A", "B"])
      end
    end

    context "when sorting random" do
      let!(:sort_id) { "" } # blank means reandom

      it "return random records" do
        expect(Transcript).to receive(:randomize_list)
        described_class.get_for_home_page(params)
      end
    end
  end
end
