json.extract! @transcript, :id, :uid, :title, :description, :url, :audio_url, :image_url, :duration, :lines, :notes, :transcript_status, :vendor_audio_urls

json.collection @transcript.collection, :id, :uid, :title, :description, :url, :image_url

json.lines @transcript.transcript_lines, :id, :start_time, :end_time, :original_text, :text, :sequence, :transcript_status_id
