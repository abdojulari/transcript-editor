# frozen_string_literal: true

# Institution represents each library
class Institution < ApplicationRecord
  include ImageSizeValidation

  extend FriendlyId
  friendly_id :name, use: :slugged

  mount_uploader :image, ImageUploader
  mount_uploader :hero_image, ImageUploader

  has_many :collections, dependent: :destroy
  has_many :transcription_conventions, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :slug, format: { with: /\A^[a-zA-Z0-9-]*$\z/ }
  validates :max_line_edits, numericality: true

  attribute :max_line_edits, :integer, default: 3

  validate :image_size_restriction

  scope :order_asc, -> { order("LOWER(institutions.name)") }

  def should_generate_new_friendly_id?
    false
  end

  after_create do
    # creates the default list
    TranscriptionConvention.create_default(id)
  end

  before_save do
    # setting up the configs
    self.min_lines_for_consensus = max_line_edits
    self.min_lines_for_consensus_no_edits = max_line_edits
  end
end
