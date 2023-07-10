class Vendor < ApplicationRecord
  has_paper_trail
  has_many :collections
  has_many :transcripts
end
