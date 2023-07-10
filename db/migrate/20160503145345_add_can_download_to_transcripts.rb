class AddCanDownloadToTranscripts < ActiveRecord::Migration
  def change
    add_column :transcripts, :can_download, :integer, :null => false, :default => 1
  end
end
