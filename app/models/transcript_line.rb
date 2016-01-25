class TranscriptLine < ActiveRecord::Base

  include PgSearch
  multisearchable :against => [:original_text, :text]

  belongs_to :transcript

end
