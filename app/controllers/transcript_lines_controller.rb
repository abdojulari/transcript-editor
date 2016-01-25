class TranscriptLinesController < ApplicationController
  before_action :set_transcript_line, only: [:show, :update, :destroy]

  # GET /transcript_lines
  # GET /transcript_lines.json
  def index
    @transcript_lines = TranscriptLine.all

    render json: @transcript_lines
  end

  # GET /transcript_lines/1
  # GET /transcript_lines/1.json
  def show
    render json: @transcript_line
  end

  # POST /transcript_lines
  # POST /transcript_lines.json
  def create
    @transcript_line = TranscriptLine.new(transcript_line_params)

    if @transcript_line.save
      render json: @transcript_line, status: :created, location: @transcript_line
    else
      render json: @transcript_line.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transcript_lines/1
  # PATCH/PUT /transcript_lines/1.json
  def update
    @transcript_line = TranscriptLine.find(params[:id])

    if @transcript_line.update(transcript_line_params)
      head :no_content
    else
      render json: @transcript_line.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transcript_lines/1
  # DELETE /transcript_lines/1.json
  def destroy
    @transcript_line.destroy

    head :no_content
  end

  private

    def set_transcript_line
      @transcript_line = TranscriptLine.find(params[:id])
    end

    def transcript_line_params
      params.require(:transcript_line).permit(:transcript_id, :start_time, :end_time, :speaker_id, :text, :sequence, :transcript_status_id, :notes)
    end
end
