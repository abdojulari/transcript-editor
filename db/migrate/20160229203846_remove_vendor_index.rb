class RemoveVendorIndex < ActiveRecord::Migration[4.2]
  def change
    remove_index :collections, :name => 'index_collections_on_vendor_id_and_vendor_identifier'
    remove_index :transcripts, :name => 'index_transcripts_on_vendor_id_and_vendor_identifier'
  end
end
