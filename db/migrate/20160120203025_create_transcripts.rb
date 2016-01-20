class CreateTranscripts < ActiveRecord::Migration
  def change
    create_table :transcripts do |t|
      t.string :uid, :null => false, :default => ""
      t.string :title
      t.text :description
      t.string :url
      t.string :audio_url
      t.string :image_url
      t.integer :collection_id, :null => false, :default => 0
      t.string :vendor, :null => false, :default => ""
      t.string :vendor_identifier, :null => false, :default => ""
      t.integer :duration, :null => false, :default => 0
      t.integer :lines, :null => false, :default => 0
      t.text :notes
      t.string :transcript_status, :null => false, :default => "initialized"
      t.integer :order, :null => false, :default => 0
      t.integer :created_by, :null => false, :default => 0
      t.string :batch_id, :null => false, :default => "unknown"
      t.datetime :transcript_retrieved_at
      t.datetime :transcript_processed_at

      t.timestamps null: false
    end

    add_index :transcripts, :uid, :unique => true
    add_index :transcripts, :collection_id
    add_index :transcripts, :transcript_status
    add_index :transcripts, :vendor
    add_index :transcripts, [:vendor, :vendor_identifier], :unique => true
    add_index :transcripts, :duration

  end
end
