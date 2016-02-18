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

  def self.getByLine(transcript_line_id)
    TranscriptEdit
      .select('transcript_edits.*, COALESCE(user_roles.name, \'guest\') as user_role, COALESCE(user_roles.hiearchy, 0) as user_hiearchy')
      .joins('LEFT OUTER JOIN users ON users.id = transcript_edits.user_id LEFT OUTER JOIN user_roles ON user_roles.id = users.user_role_id')
      .where(transcript_line_id: transcript_line_id)
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
