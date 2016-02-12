class AddGuessToTranscriptLine < ActiveRecord::Migration
  def change
    add_column :transcript_lines, :guess_text, :string, :null => false, :default => ""
  end
end
