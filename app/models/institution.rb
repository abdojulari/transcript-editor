class Institution < ApplicationRecord
  has_many :collectoins

  validates :name, presence: true
end
