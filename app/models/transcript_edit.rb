class TranscriptEdit < ActiveRecord::Base

  belongs_to :transcript
  belongs_to :transcript_line

  validates :session_id, presence: true
  validates :transcript_id, numericality: { only_integer: true }, presence: true
  validates :transcript_line_id, numericality: { only_integer: true }, presence: true
  validates :text, presence: true

  def normalizedText
    # downcase; remove punctuation; remove extra whitespace; trim
    text.downcase.gsub(/[^0-9a-z ]/i, '').gsub(/\s+/, ' ').strip
  end

  def self.getByTranscriptSession(transcript_id, session_id)
    TranscriptEdit.where(transcript_id: transcript_id, session_id: session_id)
  end

  def self.getByTranscriptUser(transcript_id, user_id)
    TranscriptEdit.where(transcript_id: transcript_id, user_id: user_id)
  end

  def self.updateUserSessions(session_id, user_id)
    TranscriptEdit.where(session_id: session_id).update_all(user_id: user_id)
  end

end
