json.array!(@transcript_edits) do |transcript_edit|
  json.extract! transcript_edit, :id, :transcript_id, :transcript_line_id, :user_id, :session_id, :text, :weight
  json.url transcript_edit_url(transcript_edit, format: :json)
end
