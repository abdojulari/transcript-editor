class TranscriptEditSerializer < ActiveModel::Serializer
  attributes :id, :transcript_id, :transcript_line_id, :user_id, :session_id, :text, :weight
end
