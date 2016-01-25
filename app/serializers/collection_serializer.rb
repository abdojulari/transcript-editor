class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :uid, :title, :description, :url, :image_url, :vendor_id, :vendor_identifier
end
