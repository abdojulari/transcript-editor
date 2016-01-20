class VendorSerializer < ActiveModel::Serializer
  attributes :id, :identifier, :name, :description, :url, :image_url
end
