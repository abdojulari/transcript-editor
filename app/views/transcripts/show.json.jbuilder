json.language "en-US"
json.id @transcript.id
json.parts @transcript.transcript_lines, :id, :start_time, :end_time, :text, :speaker_id
