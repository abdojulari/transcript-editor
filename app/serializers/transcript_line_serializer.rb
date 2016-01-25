class TranscriptLineSerializer < ActiveModel::Serializer
  attributes :id, :transcript_id, :start_time, :end_time, :speaker_id, :original_text, :text, :sequence, :transcript_status_id, :notes
end
