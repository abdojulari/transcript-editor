class TranscriptFilesController < ApplicationController
  include ActionController::MimeResponds

  before_action :set_transcript, only: [:show, :update, :destroy]

  # GET /transcripts.json
  def index
    project = Project.getActive
    @project_settings = project[:data]
    @transcripts = Transcript.getForHomepage(params[:page])
  end

  # GET /transcript_files/the-uid.json?edits=1
  # GET /transcript_files/the-uid.text?timestamps=1&speakers=1
  # GET /transcript_files/the-uid.vtt?speakers=1
  def show
    @transcript_lines = []
    @transcript_line_statuses = []
    @transcript_speakers = []
    @transcript_edits = []
    @opt = transcript_file_params

    if params[:format] == "json"
      @transcript_line_statuses = TranscriptLineStatus.allCached
      @transcript_speakers = TranscriptSpeaker.getByTranscriptId(@transcript.id)
      @transcript_edits = TranscriptEdit.getByTranscript(@transcript.id) if @opt[:edits]

    elsif @opt[:speakers]
      @transcript_lines = TranscriptLine.getByTranscriptWithSpeakers(@transcript.id)

    else
      @transcript_lines = @transcript.transcript_lines
    end
  end

  private

    def set_transcript
      @transcript = Transcript.find_by(uid: params[:id])
    end

    def transcript_file_params
      params.permit(:original_text, :edits, :timestamps, :speakers)
    end
end
