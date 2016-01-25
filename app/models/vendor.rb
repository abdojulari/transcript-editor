class Vendor < ActiveRecord::Base

  has_many :collections
  has_many :transcripts

end
