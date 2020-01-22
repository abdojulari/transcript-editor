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
  has_many :users, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :slug, format: { with: /\A^[a-zA-Z0-9-]*$\z/ }
  validates :min_lines_for_consensus, numericality: true

  attribute :min_lines_for_consensus, :integer, default: 3

  validate :image_size_restriction

  HUMANIZED_ATTRIBUTES = {
    :slug => "UID"
  }

  scope :order_asc, -> { order("LOWER(institutions.name)") }

  def self.human_attribute_name(attr, options = {})
    HUMANIZED_ATTRIBUTES[attr.to_sym] || super
  end

  def should_generate_new_friendly_id?
    false
  end

  def self.state_library_nsw
    find_by(name: "State Library of New South Wales")
  end

  after_create do
    # creates the default list
    TranscriptionConvention.create_default(id)
  end

  before_save do
    # setting up the configs
    self.max_line_edits = min_lines_for_consensus
    self.min_lines_for_consensus_no_edits = min_lines_for_consensus
    self.min_percent_consensus = min_lines_for_consensus.to_f / (max_line_edits + 1).to_f
  end

  def self.all_institution_disk_usage
    Rails.cache.fetch("Institution:disk_usage:all", expires_in: 1.hour) do
      Institution.all.map { |i| i.disk_usage }
        .inject({ image: 0, audio: 0, script: 0 }) do |memo, tu|
          memo[:image] += tu[:image]
          memo[:audio] += tu[:audio]
          memo[:script] += tu[:script]
          memo
        end
    end
  end

  def duration
    Rails.cache.fetch("Institution:duration:#{self.id}", expires_in: 1.hour) do
      collections.map(&:duration).inject(0) { |memo, duration| memo + duration }
    end
  end

  def disk_usage
    Rails.cache.fetch("Institution:disk_usage:#{self.id}", expires_in: 1.hour) do
      collections.map(&:disk_usage)
        .inject({ image: 0, audio: 0, script: 0 }) do |memo, tu|
          memo[:image] += tu[:image]
          memo[:audio] += tu[:audio]
          memo[:script] += tu[:script]
          memo
        end
    end
  end
end
