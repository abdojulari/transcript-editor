class CreateUserRoles < ActiveRecord::Migration
  def change
    create_table :user_roles do |t|
      t.string :name, :null => false, :default => ""
      t.integer :hiearchy, :null => false, :default => 0
      t.string :description

      t.timestamps null: false
    end

    add_index :user_roles, :name, :unique => true

    add_column :users, :user_role, :string, :null => false, :default => "user"
  end
end
