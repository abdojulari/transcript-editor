class Institution < ApplicationRecord
  include ImageSizeValidation

  extend FriendlyId
  friendly_id :name, use: :slugged

  mount_uploader :image, ImageUploader


  has_many :collections

  validates :name, presence: true
  validates :name, uniqueness: true

  validate :image_size_restriction

  scope :order_asc, -> { order("LOWER(institutions.name)") }

end
