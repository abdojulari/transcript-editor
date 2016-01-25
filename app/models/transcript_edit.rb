class TranscriptEdit < ActiveRecord::Base
  belongs_to :transcript
  belongs_to :transcript_line
end
