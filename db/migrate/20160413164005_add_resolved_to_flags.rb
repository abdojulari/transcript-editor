class AddResolvedToFlags < ActiveRecord::Migration
  def change
    add_column :flags, :is_resolved, :integer, :null => false, :default => 0
  end
end
