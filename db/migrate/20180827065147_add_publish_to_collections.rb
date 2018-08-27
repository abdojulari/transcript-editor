class AddPublishToCollections < ActiveRecord::Migration[5.2]
  def change
    add_column :collections, :publish, :boolean, default: false
  end
end
