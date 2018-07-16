# frozen_string_literal: true

RSpec.describe Institution, type: :model do
  # associations
  it { should have_many(:collections) }

  # validations
  it { should validate_presence_of(:name) }
  it { should validate_numericality_of(:max_line_edits) }
  it { should validate_uniqueness_of(:name) }
  it { should allow_value('correct-value').for(:slug) }
  it { should_not allow_value('value with space').for(:slug) }

  context 'when an institution is first created' do
    let(:institution) { FactoryBot.build(:institution) }

    context '.create_default' do
      it 'creates a transcript convention' do
        expect do
          institution.save
        end.to change { institution.transcription_conventions.count }.by(8)
      end
    end
  end

  context 'when saving a record' do
    let(:institution) { FactoryBot.create(:institution, max_line_edits: 4,
                                         min_lines_for_consensus: 0, min_lines_for_consensus_no_edits: 0) }

    it 'updates other configs' do
      ins = Institution.find(institution.id)
      expect(ins.min_lines_for_consensus).to eq(4)
      expect(ins.min_lines_for_consensus_no_edits).to eq(4)
    end
  end
end
