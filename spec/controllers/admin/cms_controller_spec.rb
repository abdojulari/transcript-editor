require 'rails_helper'

RSpec.describe Admin::CmsController, type: :controller do
  before do
    current_user = double("current_user", to_sym: :current_user)
    allow_any_instance_of(Admin::ApplicationController).to receive(:user_signed_in?).and_return(true)
    allow_any_instance_of(Admin::ApplicationController).to receive(current_user).and_return(current_user)
    allow(current_user).to receive(:isAdmin?).and_return(true)
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
