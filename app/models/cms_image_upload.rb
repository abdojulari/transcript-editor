class CmsImageUpload < ApplicationRecord
  has_paper_trail
  mount_uploader :image, CmsImageUploader
end
