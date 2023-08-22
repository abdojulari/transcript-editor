class AddGuessToTranscriptLine < ActiveRecord::Migration[4.2]
  def change
    add_column :transcript_lines, :guess_text, :string, :null => false, :default => ""
  end
end
