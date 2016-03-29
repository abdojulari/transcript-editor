class Admin::StatsController < ApplicationController
  include ActionController::MimeResponds

  # GET /admin
  # GET /admin.json
  def index
    respond_to do |format|
      format.html {
        render :file => "public/#{ENV['PROJECT_ID']}/admin.html"
      }
      format.json {
        @stats = {}
      }
    end
  end

end
