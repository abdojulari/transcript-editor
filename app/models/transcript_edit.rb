class TranscriptEdit < ActiveRecord::Base
  belongs_to :transcript
  belongs_to :transcript_line

  validates :session_id, presence: true
  validates :transcript_id, numericality: { only_integer: true }, presence: true
  validates :transcript_line_id, numericality: { only_integer: true }, presence: true
  validates :text, presence: true

  def self.getByTranscriptSession(transcript_id, session_id)
    TranscriptEdit.where(transcript_id: transcript_id, session_id: session_id)
  end

  def self.getByTranscriptUser(transcript_id, user_id)
    TranscriptEdit.where(transcript_id: transcript_id, user_id: user_id)
  end

end
