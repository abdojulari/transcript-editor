# frozen_string_literal: true

RSpec.describe User, type: :model do
  # associations
  it { is_expected.to belong_to(:institution) }

  # scopes
  context "with scopes" do
    let(:admin_role) { create :user_role, :admin, id: 5 }
    let(:registred_user_role) { create :user_role, id: 2 }

    let!(:admin_user) { create :user, user_role: admin_role }
    let!(:registred_user) { create :user, user_role: registred_user_role }

    context "with .only staff users" do
      it "shows the admin" do
        expect(described_class.only_staff_users).to eq([admin_user])
        expect(described_class.only_staff_users).not_to eq([registred_user])
      end
    end

    context "with .only public users" do
      it "shows the public user" do
        expect(described_class.only_public_users).to eq([registred_user])
        expect(described_class.only_public_users).not_to eq([admin_user])
      end
    end
  end
end
