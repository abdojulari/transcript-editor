class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :uid, :null => false, :default => ""
      t.string :title
      t.text :description
      t.string :url
      t.string :image_url
      t.string :vendor, :null => false, :default => ""
      t.string :vendor_identifier, :null => false, :default => ""

      t.timestamps null: false
    end

    add_index :collections, :uid, :unique => true
    add_index :collections, :vendor
    add_index :collections, [:vendor, :vendor_identifier], :unique => true
  end
end
