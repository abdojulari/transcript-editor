json.entries @transcripts do |transcript|
  json.extract! transcript, :id, :uid, :title, :description, :image_url, :collection_id, :duration, :lines, :transcript_status_id
  json.url transcript_url(transcript, format: :json)
  json.path transcript_path(transcript, format: :json)
end

json.current_page @transcripts.current_page
json.per_page @transcripts.per_page
json.total_entries @transcripts.total_entries
