class AddVendorAudioUrlsToTranscript < ActiveRecord::Migration
  def change
    add_column :transcripts, :vendor_audio_urls, :jsonb, :null => false, :default => '[]'
  end
end
