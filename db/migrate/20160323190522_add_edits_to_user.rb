class AddEditsToUser < ActiveRecord::Migration
  def change
    add_column :users, :lines_edited, :integer, :null => false, :default => 0
  end
end
