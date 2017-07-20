class RemoveCallNumberFromCollection < ActiveRecord::Migration
  def up
    remove_columns :collections, :call_number
  end

  def down
    add_column :collections, :call_number, :string, null: false, default: ""
  end
end
