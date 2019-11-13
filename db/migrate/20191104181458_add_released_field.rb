class AddReleasedField < ActiveRecord::Migration
  def change
    add_column :transcripts, :released, :boolean, default: false
  end
end
