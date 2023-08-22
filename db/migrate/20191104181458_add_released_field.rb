class AddReleasedField < ActiveRecord::Migration[4.2]
  def change
    add_column :transcripts, :released, :boolean, default: false
  end
end
