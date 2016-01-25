class CreateTranscriptEdits < ActiveRecord::Migration
  def change
    create_table :transcript_edits do |t|
      t.integer :transcript_id
      t.integer :transcript_line_id
      t.integer :user_id
      t.integer :session_id
      t.string :text
      t.integer :weight

      t.timestamps null: false
    end

    add_index :transcript_edits, :transcript_id
    add_index :transcript_edits, :transcript_line_id
    add_index :transcript_edits, :user_id
    add_index :transcript_edits, :session_id
    add_index :transcript_edits, [:session_id, :transcript_line_id], :unique => true
  end
end
