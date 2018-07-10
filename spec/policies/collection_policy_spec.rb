RSpec.describe CollectionPolicy do
  let!(:collection) { FactoryBot.create :collection }

  subject { described_class.new(user, collection)  }

  context "actions" do
    let(:user) { FactoryBot.create :user, user_role: user_role }

    context "admin" do
      let!(:user_role) { FactoryBot.create :user_role, :admin }

      it { is_expected.to permit_action(:show)  }
    end

    context "moderator" do
      let!(:user_role) { FactoryBot.create :user_role, :moderator }

      it { is_expected.not_to permit_action(:show)  }
    end
  end
end
