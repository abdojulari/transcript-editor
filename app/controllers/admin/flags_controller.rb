class Admin::FlagsController < ApplicationController
  include ActionController::MimeResponds

  before_action :authenticate_moderator!

  # GET /admin/flags
  # GET /admin/flags.json
  # GET /moderator
  def index
    respond_to do |format|
      format.html {
        render :file => environment_admin_file
      }
      format.json {
        @flags = Flag.getUnresolved()
      }
    end
  end

end
