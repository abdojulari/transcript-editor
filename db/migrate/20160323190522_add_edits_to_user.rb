class AddEditsToUser < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :lines_edited, :integer, :null => false, :default => 0
  end
end
