class RemoveCallNumberFromCollection < ActiveRecord::Migration
  def change
    remove_columns :collections, :call_number, :string
  end
end
