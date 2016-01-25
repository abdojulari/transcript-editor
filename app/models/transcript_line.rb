class TranscriptLine < ActiveRecord::Base

  include PgSearch
  multisearchable :against => [:original_text, :text]

  belongs_to :transcript
  has_many :transcript_edits

end
