RSpec.describe Flag, type: :model do
  describe "saving flag" do
    let(:flag) { FactoryBot.build(:flag, flag_type_id: 0) }

    context "without a flag type" do
      # custom text
      it "saves flag type" do
        expect(flag.save).to be_truthy
      end
    end
  end
end
