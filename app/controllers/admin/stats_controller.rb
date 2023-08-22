class Admin::StatsController < ApplicationController
  include ActionController::MimeResponds
  # before_action :authenticate_moderator!

  # GET /stats.json
  def index
    respond_to do |format|
      format.json {
        @stats = [
          {label: "User Registration Stats", data: User.getStatsByDay},
          {label: "Transcript Edit Stats", data: TranscriptEdit.getStatsByDay}
        ]
      }
    end
  end
  def user_data
    # duh take date optiosn from params
    users = User.numberTranscriptEditsByUser()
    respond_to do |format|
      format.json {
        render json: {data: users}
      }
    end
  end

  def transcripts_completed_data
    transcripts = Transcript.transcriptsCompleted()
    puts "COMPLETED DATA"
    puts transcripts
    respond_to do |format|
      format.json {
        render json: {data: transcripts}
      }
    end
  end

  def edit_activity_data
    transcripts = Transcript.editActivity()
    puts "EIDTTTT DATA"
    puts transcripts

    respond_to do |format|
      format.json {
        render json: {data: transcripts}
      }
    end
  end  
end
