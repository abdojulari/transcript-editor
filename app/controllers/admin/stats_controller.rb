class Admin::StatsController < ApplicationController
  include ActionController::MimeResponds
  include IndexTemplate

  before_filter :authenticate_moderator!

  # GET /admin
  # GET /admin.json
  def index
    respond_to do |format|
      format.html {
        render :file => environment_admin_file
      }
      format.json {
        @stats = [
          {label: "User Registration Stats", data: User.getStatsByDay},
          {label: "Transcript Edit Stats", data: TranscriptEdit.getStatsByDay}
        ]
      }
    end
  end

end
