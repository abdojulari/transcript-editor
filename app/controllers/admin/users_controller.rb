class Admin::UsersController < ApplicationController
  include ActionController::MimeResponds

  before_action :set_user, only: [:show, :update, :destroy]

  # GET /admin/users
  # GET /admin/users.json
  def index
    respond_to do |format|
      format.html {
        render :file => "public/#{ENV['PROJECT_ID']}/admin.html"
      }
      format.json {
        @users = []
      }
    end
  end

  # PATCH/PUT /admin/users/{id}.json
  def update

    if @transcript.update(transcript_params)
      head :no_content
    else
      render json: @transcript.errors, status: :unprocessable_entity
    end
  end

  private

    def set_user
      @transcript = Transcript.find_by(uid: params[:id])
    end

    def user_params
      params.require(:user).permit(:user_role_id)
    end

end
