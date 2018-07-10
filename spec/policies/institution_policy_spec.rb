RSpec.describe InstitutionPolicy do
  let!(:institution) { FactoryBot.create :institution }

  context "scopes" do
    let(:user) { FactoryBot.create :user, user_role: user_role }
    let(:policy_scope) { InstitutionPolicy::Scope.new(user, Institution).resolve  }

    context "admin" do
      let!(:user_role) { FactoryBot.create :user_role, :admin }

      it 'allows admins to see all the institutions' do
        expect(policy_scope).to eq [institution]
      end
    end

    context "moderator" do
      let!(:user_role) { FactoryBot.create :user_role, :moderator }

      # NOTE: this is a temporary functionality, this code will
      #       update for moderators to see their own institutions
      #       later in the sprint
      #
      it 'does not allows moderators to see all the institutions' do
        expect(policy_scope).not_to eq [institution]
      end
    end
  end
end
