class AddPublishedToTranscripts < ActiveRecord::Migration[4.2]
  def change
    add_column :transcripts, :is_published, :integer, :null => false, :default => 1
  end
end
