json.extract! @transcript, :id, :uid, :title, :description, :url, :audio_url, :image_url, :duration, :lines, :notes, :vendor_audio_urls

json.transcript_status @transcript.transcript_status, :id, :name, :description

json.collection @transcript.collection, :id, :uid, :title, :description, :url, :image_url

json.lines @transcript.transcript_lines, :id, :start_time, :end_time, :original_text, :text, :sequence, :transcript_line_status_id

json.user_edits @user_edits, :transcript_line_id, :text, :updated_at
