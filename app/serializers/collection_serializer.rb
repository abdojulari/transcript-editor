class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :uid, :title, :description, :url, :image_url, :vendor, :vendor_identifier
end
