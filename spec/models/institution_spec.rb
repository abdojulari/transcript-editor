# frozen_string_literal: true

RSpec.describe Institution, type: :model do
  # associations
  it { is_expected.to have_many(:collections) }
  it { is_expected.to have_many(:users) }

  # validations
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_numericality_of(:max_line_edits) }
  it { is_expected.to validate_uniqueness_of(:name) }
  it { is_expected.to allow_value("correct-value").for(:slug) }
  it { is_expected.not_to allow_value("value with space").for(:slug) }

  context "when an institution is first created" do
    let(:institution) { FactoryBot.build(:institution) }

    context "when create_default" do
      it "creates a transcript convention" do
        expect do
          institution.save
        end.to change { institution.transcription_conventions.count }.by(8)
      end
    end
  end

  context "when saving a record" do
    let(:institution) do
      FactoryBot.create(:institution,
                        max_line_edits: 4,
                        min_lines_for_consensus: 0,
                        min_lines_for_consensus_no_edits: 0)
    end

    it "updates other configs" do
      ins = Institution.find(institution.id)
      expect(ins.min_lines_for_consensus).to eq(4)
      expect(ins.min_lines_for_consensus_no_edits).to eq(4)
    end
  end
end
