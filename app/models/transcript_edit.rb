class TranscriptEdit < ActiveRecord::Base
  belongs_to :transcript
  belongs_to :transcript_line

  validates :session_id, numericality: { only_integer: true }, presence: true
  validates :transcript_id, numericality: { only_integer: true }, presence: true
  validates :transcript_line_id, numericality: { only_integer: true }, presence: true
  validates :text, presence: true
end
