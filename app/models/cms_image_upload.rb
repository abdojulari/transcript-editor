class CmsImageUpload < ApplicationRecord
  mount_uploader :image, CmsImageUploader
end
