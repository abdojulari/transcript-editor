json.extract! @transcript, :id, :uid, :title, :description, :url, :audio_url, :image_url, :duration, :lines, :notes, :vendor_audio_urls, :percent_completed, :percent_edited, :lines_completed, :lines_edited

json.transcript_status @transcript.transcript_status, :id, :name, :progress, :description

unless @transcript.collection.nil?
  json.collection @transcript.collection, :id, :uid, :title, :description, :url, :image_url
end

json.lines @transcript.transcript_lines, :id, :start_time, :end_time, :original_text, :text, :guess_text, :sequence, :transcript_line_status_id, :speaker_id

json.speakers @transcript_speakers, :id, :name

json.transcript_line_statuses @transcript_line_statuses, :id, :name, :progress, :description

json.user_edits @user_edits, :transcript_line_id, :text, :updated_at

unless @user_role.nil?
  json.user_role @user_role, :id, :name, :hiearchy
end
