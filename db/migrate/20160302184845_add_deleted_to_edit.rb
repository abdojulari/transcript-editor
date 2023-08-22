class AddDeletedToEdit < ActiveRecord::Migration[4.2]
  def change
    add_column :transcript_edits, :is_deleted, :integer, :null => false, :default => 0
  end
end
