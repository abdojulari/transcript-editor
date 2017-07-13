class Collection < ActiveRecord::Base
  # The collection will only have one image that is
  # used as the default image for the collection.
  # It will only be used if none of the transcripts
  # have images associated. Usually one of the transcripts
  # images are selected for the collection.
  mount_uploader :image_url, ImageUploader

  has_many :transcripts
  belongs_to :vendor

  validates :vendor, :description, presence: true
  validates :uid, :title, :call_number, :url, presence: true, uniqueness: true

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
