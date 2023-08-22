class AddVendorAudioUrlsToTranscript < ActiveRecord::Migration[4.2]
  def change
    add_column :transcripts, :vendor_audio_urls, :jsonb, :null => false, :default => '[]'
  end
end
