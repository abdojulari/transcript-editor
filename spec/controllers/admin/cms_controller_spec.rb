require 'rails_helper'

RSpec.describe Admin::CmsController, type: :controller do
  let(:user) { create(:user, :admin, email: "user@email.com", password: "password") }

  before do
    sign_in user
  end

  describe "GET #show" do
    let(:action) { get :show }

    it "is successful" do
      action
      expect(response).to have_http_status(:ok)
    end

    it "displays the cms dashboard" do
      action
      expect(response).to render_template(:show)
    end
  end
end
