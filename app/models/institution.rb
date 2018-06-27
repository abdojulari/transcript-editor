class Institution < ApplicationRecord
  has_many :collections

  validates :name, presence: true
  validates :name, uniqueness: true

  scope :order_asc, -> { order("LOWER(institutions.name)") }
end
