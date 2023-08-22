class DropProjectsTable < ActiveRecord::Migration[4.2]
  def change
    drop_table :projects
  end
end
