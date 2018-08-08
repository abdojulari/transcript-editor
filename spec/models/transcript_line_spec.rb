RSpec.describe TranscriptLine, type: :model do
  describe "#recalculate" do
    let(:min_lines_for_consensus) { 2 }
    let(:institution) do
      FactoryBot.create :institution,
                        min_lines_for_consensus: min_lines_for_consensus
    end
    let(:original_text) { "original text" }
    let(:collection) { FactoryBot.create :collection, institution: institution }
    let!(:transcript) { FactoryBot.create :transcript, collection: collection }
    let(:transcript_line) do
      FactoryBot.create :transcript_line,
                        transcript: transcript,
                        original_text: original_text
    end
    let(:transcript_edit) do
      FactoryBot.create :transcript_edit,
                        transcript: transcript,
                        transcript_line: transcript_line
    end
    let(:project) { Project.getActive(collection.id) }

    let!(:statues) do
      # rubocop:disable Metrics/LineLength
      [
        { name: "initialized", progress: 0, description: "Line contains unedited computer-generated text" },
        { name: "editing", progress: 25, description: "Line has been edited by others" },
        { name: "reviewing", progress: 50, description: "Line is being reviewed" },
        { name: "completed", progress: 100, description: "Line has been completed" },
        { name: "flagged", progress: 150, description: "Line has been marked as incorrect or problematic" },
        { name: "archived", progress: 200, description: "Line has been archived" },
      ].each do |item|
        TranscriptLineStatus.create(name: item[:name], progress: item[:progress], description: item["description"])
      end
      # rubocop:enable Metrics/LineLength
    end

    # rubocop:disable RSpec/ExampleLength: Example has too many lines
    context "when verifying with 2 min_lines_for_consensus" do
      let!(:min_lines_for_consensus) { 2 }

      it "third selection should make the line as completed" do
        create_edit_and_recalculate("first")
        expect(transcript_line.transcript_line_status.name).to eq("editing")

        create_edit_and_recalculate("second")
        expect(transcript_line.transcript_line_status.name).to eq("reviewing")

        create_edit_and_recalculate("first")
        expect(transcript_line.transcript_line_status.name).to eq("completed")
      end
    end

    context "when verifying with 4 min_lines_for_consensus" do
      let!(:min_lines_for_consensus) { 4 }

      it "fifth selection should make the line as completed" do
        create_edit_and_recalculate("first")
        create_edit_and_recalculate("first")
        create_edit_and_recalculate("first")
        expect(transcript_line.transcript_line_status.name).to eq("editing")

        create_edit_and_recalculate("second")
        expect(transcript_line.transcript_line_status.name).to eq("reviewing")

        create_edit_and_recalculate("first")
        expect(transcript_line.transcript_line_status.name).to eq("completed")
      end
    end
    # rubocop:enable RSpec/ExampleLength: Example has too many lines
  end

  private

  def create_edit_and_recalculate(text)
    create_edit(text)
    re_calculate
  end

  def create_edit(text)
    FactoryBot.create :transcript_edit,
                      transcript: transcript,
                      transcript_line: transcript_line,
                      text: text
  end

  def re_calculate
    transcript_line.recalculate(nil, project)
    transcript_line.reload
  end
end
