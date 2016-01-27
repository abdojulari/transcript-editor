class TranscriptsController < ApplicationController
  before_action :set_transcript, only: [:show, :update, :destroy]

  # GET /transcripts
  # GET /transcripts.json
  def index
    @transcripts = Transcript.getForHomepage(params[:page])
  end

  # GET /transcripts/1
  # GET /transcripts/1.json
  def show

  end

  # POST /transcripts
  # POST /transcripts.json
  def create
    @transcript = Transcript.new(transcript_params)

    if @transcript.save
      render json: @transcript, status: :created, location: @transcript
    else
      render json: @transcript.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transcripts/1
  # PATCH/PUT /transcripts/1.json
  def update
    @transcript = Transcript.find(params[:id])

    if @transcript.update(transcript_params)
      head :no_content
    else
      render json: @transcript.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transcripts/1
  # DELETE /transcripts/1.json
  def destroy
    @transcript.destroy

    head :no_content
  end

  private

    def set_transcript
      @transcript = Transcript.find(params[:id])
    end

    def transcript_params
      params.require(:transcript).permit(:uid, :title, :description, :url, :audio_url, :image_url, :collection_id, :vendor_id, :vendor_identifier, :duration, :lines, :notes, :transcript_status_id, :order, :created_by, :batch_id, :transcript_retrieved_at, :transcript_processed_at)
    end
end
