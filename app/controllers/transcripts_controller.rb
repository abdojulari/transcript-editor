class TranscriptsController < ApplicationController
  include ActionController::MimeResponds

  before_action :set_transcript, only: [:show, :update, :destroy]

  # GET /transcripts.json
  def index
    project = Project.getActive
    @project_settings = project[:data]
    @transcripts = Transcript.getForHomepage(params[:page])
  end

  # GET /transcripts/the-uid
  # GET /transcripts/the-uid.json
  def show
    respond_to do |format|
      format.html {
        render :file => "public/#{ENV['PROJECT_ID']}/index.html"
      }
      format.json {
        @user_role = nil
        @user_edits = []
        @transcript_line_statuses = TranscriptLineStatus.allCached
        @transcript_speakers = TranscriptSpeaker.getByTranscriptId(@transcript.id)

        if user_signed_in?
          @user_edits = TranscriptEdit.getByTranscriptUser(@transcript.id, current_user.id)
          @user_role = current_user.user_role
        else
          @user_edits = TranscriptEdit.getByTranscriptSession(@transcript.id, session.id)
        end
      }
    end


  end

  # POST /transcripts.json
  def create
    @transcript = Transcript.new(transcript_params)

    if @transcript.save
      render json: @transcript, status: :created, location: @transcript
    else
      render json: @transcript.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transcripts/the-uid.json
  def update

    if @transcript.update(transcript_params)
      head :no_content
    else
      render json: @transcript.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transcripts/the-uid.json
  def destroy
    @transcript.destroy

    head :no_content
  end

  private

    def set_transcript
      @transcript = Transcript.find_by(uid: params[:id])
    end

    def transcript_params
      params.require(:transcript).permit(:title, :description, :url, :audio_url, :image_url, :collection_id, :notes, :transcript_status_id)
    end
end
