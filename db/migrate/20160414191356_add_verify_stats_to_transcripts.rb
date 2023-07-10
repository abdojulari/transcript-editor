class AddVerifyStatsToTranscripts < ActiveRecord::Migration
  def change
    add_column :transcripts, :percent_reviewing, :integer, :null => false, :default => 0
    add_column :transcripts, :lines_reviewing, :integer, :null => false, :default => 0
    add_column :transcripts, :users_contributed, :integer, :null => false, :default => 0
  end
end
