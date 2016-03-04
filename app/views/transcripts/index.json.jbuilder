json.entries @transcripts do |transcript|
  json.extract! transcript, :uid, :title, :description, :image_url, :collection_id, :collection_title, :duration, :percent_completed
  json.path transcript_path(transcript)
end

json.current_page @transcripts.current_page
json.per_page @transcripts.per_page
json.total_entries @transcripts.total_entries
