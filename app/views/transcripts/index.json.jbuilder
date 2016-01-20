json.array!(@transcripts) do |transcript|
  json.extract! transcript, :id, :uid, :title, :description, :url, :audio_url, :image_url, :collection_id, :vendor_id, :vendor_identifier, :duration, :lines, :notes, :transcript_status_id, :order, :created_by, :batch_id, :transcript_retrieved_at, :transcript_processed_at
  json.url transcript_url(transcript, format: :json)
end
