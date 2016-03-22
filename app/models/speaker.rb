class Speaker < ActiveRecord::Base
  has_many :transcript_speakers
end
