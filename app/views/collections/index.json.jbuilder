json.array!(@collections) do |collection|
  json.extract! collection, :id, :uid, :title, :description, :url, :image_url, :vendor_id, :vendor_identifier
  json.url collection_url(collection, format: :json)
end
