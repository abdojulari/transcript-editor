class Transcript < ActiveRecord::Base

  belongs_to :collection
  belongs_to :vendor
  belongs_to :transcript_status
  has_many :transcript_lines

  def self.getForDownloadByVendor(vendor_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND collections.vendor_id = :vendor_id AND transcripts.lines <= 0 AND collections.vendor_identifier != :empty AND transcripts.vendor_identifier != :empty",
      {vendor_id: vendor[:id], empty: ""})
  end

  def self.getForUploadByVendor(vendor_uid)
    vendor = Vendor.find_by_uid(vendor_uid)
    Transcript.joins(:collection)
      .where("transcripts.vendor_id = :vendor_id AND collections.vendor_id = :vendor_id AND transcripts.lines <= 0 AND collections.vendor_identifier != :empty",
      {vendor_id: vendor[:id], empty: ""})
  end

  def updateFromHash(contents)
    # TODO
  end

end
