class TranscriptEditsController < ApplicationController
  before_action :set_transcript_edit, only: [:show, :update, :destroy]

  # GET /transcript_edits
  # GET /transcript_edits.json
  def index
    @transcript_edits = TranscriptEdit.all

    render json: @transcript_edits
  end

  # GET /transcript_edits/1
  # GET /transcript_edits/1.json
  def show
    render json: @transcript_edit
  end

  # POST /transcript_edits
  # POST /transcript_edits.json
  def create
    @transcript_edit = nil
    params[:transcript_edit][:session_id] = session.id
    t = params[:transcript_edit]
    line = TranscriptLine.find t[:transcript_line_id]
    project = Project.getActive

    unless line
      head :no_content
      return
    end

    # If line is completed, reviewing, flagged, or archived
    # And user not signed in or doesn't have the right permissions
    # Ignore this submission
    # if line.transcript_line_status_id>0 && line.transcript_line_status && line.transcript_line_status.progress >= 50 && (!user_signed_in? || !current_user.user_role || current_user.user_role.hiearchy < project[:data]["consensus"]["superUserHiearchy"])
    #   head :no_content
    #   return
    # end

    # Retrieve existing edit for user or session
    if user_signed_in?
      params[:transcript_edit][:user_id] = current_user.id
      @transcript_edit = TranscriptEdit.find_by user_id: current_user.id, transcript_line_id: t[:transcript_line_id]
    else
      @transcript_edit = TranscriptEdit.find_by session_id: t[:session_id], transcript_line_id: t[:transcript_line_id]
    end

    success = false
    # This is a new edit
    if @transcript_edit.nil?
      @transcript_edit = TranscriptEdit.new(transcript_edit_params)
      if @transcript_edit.save
        line.recalculate(nil, project)
        render json: @transcript_edit, status: :created, location: @transcript_edit
        success = true
      end

    # This is an existing edit
    else
      if @transcript_edit.update(transcript_edit_params)
        line.recalculate(nil, project)
        head :no_content
        success = true
      end
    end

    # An error occurred
    unless success
      render json: @transcript_edit.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transcript_edits/1
  # PATCH/PUT /transcript_edits/1.json
  def update
    @transcript_edit = TranscriptEdit.find(params[:id])

    if @transcript_edit.update(transcript_edit_params)
      head :no_content
    else
      render json: @transcript_edit.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transcript_edits/1
  # DELETE /transcript_edits/1.json
  def destroy
    @transcript_edit.destroy

    head :no_content
  end

  private

    def set_transcript_edit
      @transcript_edit = TranscriptEdit.find(params[:id])
    end

    def transcript_edit_params
      params.require(:transcript_edit).permit(:transcript_id, :transcript_line_id, :user_id, :session_id, :text, :weight)
    end
end
