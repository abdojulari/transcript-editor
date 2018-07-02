class Institution < ApplicationRecord
  include ImageSizeValidation

  extend FriendlyId
  friendly_id :name, use: :slugged

  mount_uploader :image, ImageUploader
  mount_uploader :hero_image, ImageUploader


  has_many :collections

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :slug, format:  { with: /\A^[a-zA-Z0-9-]*$\z/ }

  validate :image_size_restriction

  scope :order_asc, -> { order("LOWER(institutions.name)") }

  def should_generate_new_friendly_id?
    false
  end

end
