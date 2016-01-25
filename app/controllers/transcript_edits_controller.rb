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
    @transcript_edit = TranscriptEdit.new(transcript_edit_params)

    if @transcript_edit.save
      render json: @transcript_edit, status: :created, location: @transcript_edit
    else
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
