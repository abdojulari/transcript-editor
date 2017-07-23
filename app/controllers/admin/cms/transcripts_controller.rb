class Admin::Cms::TranscriptsController < Admin::ApplicationController
  before_action :set_transcript, only: [:edit, :update]

  def new
    @transcript = Transcript.new(collection_id: collection_id)
  end

  def create
    @transcript = set_speakers(Transcript.new(transcript_params))

    if @transcript.save
      flash[:notice] = "The new transcript has been saved."
      redirect_to admin_cms_collection_path(@transcript.collection)
    else
      flash[:errors] = "The new transcript could not be saved."
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if set_speakers(@transcript).update(transcript_params)
      flash[:notice] = "The transcript updates have been saved."
      redirect_to admin_cms_collection_path(@transcript.collection)
    else
      flash[:errors] = "The transcript updates could not be saved."
      render :edit, status: :unprocessable_entity
    end
  end

  def speaker_search
    speakers = Speaker.where("LOWER(name) LIKE ?", "%#{params[:q].downcase}%").map {|s|
      {id: s.id, label: s.name, value: s.name}
    }
    render json: speakers
  end

  private

  def set_transcript
    @transcript = Transcript.find_by(uid: params[:id])
  end

  def set_speakers(transcript)
    # remove the exist speakers associated with the transcript
    transcript.transcript_speakers.destroy_all

    # replace the speakers with the edit and new form values
    transcript_params[:speakers].split(';').reject { |c| c.blank? }.map do |name|
      transcript.transcript_speakers << TranscriptSpeaker.new(
        speaker_id: Speaker.find_or_create_by(name: name.strip).id,
        collection_id: transcript.collection_id,
        project_uid: transcript_params[:project_uid]
      )
    end

    transcript
  end

  def transcript_params
    params.require(:transcript).permit(
      :uid,
      :title,
      :description,
      :audio_catalogue_url,
      :audio,
      :script,
      :image,
      :image_caption,
      :image_catalogue_url,
      :notes,
      :vendor_id,
      :collection_id,
      :speakers,
    ).merge(
      project_uid: ENV['PROJECT_ID']
    )
  end

  def collection_id
    Collection.find_by(uid: params[:collection_uid]).id
  end
end
