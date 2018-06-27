class Institution < ApplicationRecord
  has_many :collections

  validates :name, presence: true
  validates :name, uniqueness: true
end
