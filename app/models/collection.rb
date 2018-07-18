class Collection < ApplicationRecord
  include ImageSizeValidation
  include UidValidationOnUpdate

  mount_uploader :image, ImageUploader
  acts_as_taggable_on :themes

  has_many :transcripts
  belongs_to :vendor
  belongs_to :institution

  validates :vendor, :description, presence: true
  validates :institution_id, presence: true
  validates :uid, :title, :url, presence: true, uniqueness: true
  validate :image_size_restriction
  validate :uid_not_changed

  scope :by_institution, ->(institution_id) { where(institution_id: institution_id) }

  # Class Methods
  def self.getForHomepage
    Rails.cache.fetch("#{ENV['PROJECT_ID']}/collections", expires_in: 10.minutes) do
      Collection.where(project_uid: ENV['PROJECT_ID']).order("title")
    end
  end

  def self.getForDownloadByVendor(vendor_uid, project_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Collection.where("vendor_id = :vendor_id AND vendor_identifier != :empty AND project_uid = :project_uid",
      {vendor_id: vendor[:id], empty: "", project_uid: project_uid})
  end

  def self.getForUploadByVendor(vendor_uid, project_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Collection.where("vendor_id = :vendor_id AND vendor_identifier = :empty AND project_uid = :project_uid",
      {vendor_id: vendor[:id], empty: "", project_uid: project_uid})
  end

  # Instance Methods
  def to_param
    uid
  end

  def published?
    !!published_at
  end
end
