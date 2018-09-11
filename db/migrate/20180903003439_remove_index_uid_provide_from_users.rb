class RemoveIndexUidProvideFromUsers < ActiveRecord::Migration[5.2]
  def change
    # removing this uniqe to work with email logins
    remove_index :users, column: [:uid, :provider]
  end
end
