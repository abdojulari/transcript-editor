class TranscriptSerializer < ActiveModel::Serializer
  attributes :id, :uid, :title, :description, :url, :audio_url, :image_url, :collection, :vendor, :vendor_identifier, :duration, :lines, :notes, :transcript_status, :order, :created_by, :batch_id, :transcript_retrieved_at, :transcript_processed_at
end
