class AddPublishedToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :is_published, :boolean, null: false, default: false
  end
end
