json.array!(@transcript_edits) do |transcript_edit|
  json.extract! transcript_edit, :id, :transcript_line_id, :text
end
