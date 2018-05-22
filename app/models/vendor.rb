class Vendor < ApplicationRecord

  has_many :collections
  has_many :transcripts

end
