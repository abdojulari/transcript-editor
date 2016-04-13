class Flag < ActiveRecord::Base
  belongs_to :transcript_line

  def self.getByLine(transcript_line_id)
    Flag
      .select('flags.*, flag_types.label as flag_type_label, COALESCE(users.name, \'anonymous\') as user_name, COALESCE(user_roles.name, \'guest\') as user_role, COALESCE(user_roles.hiearchy, 0) as user_hiearchy')
      .joins('INNER JOIN flag_types ON flags.flag_type_id = flag_types.id LEFT OUTER JOIN users ON users.id = flags.user_id LEFT OUTER JOIN user_roles ON user_roles.id = users.user_role_id')
      .where("flags.transcript_line_id = :transcript_line_id AND flags.is_deleted = :is_deleted AND flag_types.category = :category",
      {transcript_line_id: transcript_line_id, is_deleted: 0, category: 'error'})
  end

  def self.getByTranscriptSession(transcript_id, session_id)
    Flag.where(transcript_id: transcript_id, session_id: session_id, is_deleted: 0)
  end

  def self.getByTranscriptUser(transcript_id, user_id)
    Flag.where(transcript_id: transcript_id, user_id: user_id, is_deleted: 0)
  end

  def self.updateUserSessions(session_id, user_id)
    flags = Flag.where(session_id: session_id)
    flags.update_all(user_id: user_id)
  end
end
