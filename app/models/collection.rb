class Collection < ActiveRecord::Base

  has_many :transcripts
  belongs_to :vendor

end
