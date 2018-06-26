class CollectionDecorator < ApplicationDecorator
  delegate_all

  def transcript_items
    object.transcripts.size
  end
end
