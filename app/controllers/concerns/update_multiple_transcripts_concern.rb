module UpdateMultipleTranscriptsConcern
  extend ActiveSupport::Concern

  def publish_trancripts(transcript_ids)
    @collection.transcripts.where(uid: transcript_ids).each { |t| t.publish! }
    flash.now[:notice] = 'The selected transcripts were successfully published!'
  end

  def unpublish_trancripts(transcript_ids)
    @collection.transcripts.where(uid: transcript_ids).each { |t| t.unpublish! }
    flash.now[:notice] = 'The selected transcripts were successfully unpublished!'
  end

  def delete_trancripts(transcript_ids)
    @collection.transcripts.where(uid: transcript_ids).each { |t| t.destroy }
    flash.now[:notice] = 'The selected transcripts were successfully deleted!'
  end
end
