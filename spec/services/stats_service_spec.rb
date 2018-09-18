RSpec.describe StatsService, type: :service do
  describe ".transcript_edits as admin" do
    let(:user) { create :user, :admin }
    let(:institution1) { create :institution }
    let(:institution2) { create :institution }
    let!(:collection1) { create :collection, institution: institution1 }
    let!(:collection2) { create :collection, institution: institution2 }
    let!(:transcript1) { create :transcript, collection: collection1 }
    let!(:transcript2) { create :transcript, collection: collection2 }

    before do
      create :transcript_edit, transcript: transcript1
      create :transcript_edit, transcript: transcript2
    end

    context "when not passing an institution" do
      it "shows stats for all" do
        expect(described_class.new(user).transcript_edits).
          to eq(all: 2, past_30_days: 2, past_7_days: 2, past_24_hours: 2)
      end
    end

    context "when passing institution" do
      it "shows stats for the given institution" do
        expect(described_class.new(user).transcript_edits(institution1.id)).
          to eq(all: 1, past_30_days: 1, past_7_days: 1, past_24_hours: 1)
      end
    end
  end
end
