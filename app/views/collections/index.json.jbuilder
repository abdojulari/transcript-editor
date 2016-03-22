json.array!(@collections) do |collection|
  json.extract! collection, :id, :uid, :title, :description, :url, :image_url
  json.path collection_path(collection)
end
