class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :uid, :null => false, :default => ""
      t.string :title
      t.text :description
      t.string :url
      t.string :image_url
      t.integer :vendor_id
      t.string :vendor_identifier

      t.timestamps null: false
    end

    add_index :collections, :uid, :unique => true
    add_index :collections, :vendor_id
    add_index :collections, [:vendor_id, :vendor_identifier]
  end
end
