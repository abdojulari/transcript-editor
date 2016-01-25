json.array!(@transcript_lines) do |transcript_line|
  json.extract! transcript_line, :id, :transcript_id, :start_time, :end_time, :speaker_id, :original_text, :text, :sequence, :transcript_status_id, :notes
  json.url transcript_line_url(transcript_line, format: :json)
end
