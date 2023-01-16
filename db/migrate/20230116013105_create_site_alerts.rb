class CreateSiteAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :site_alerts do |t|
      t.string :machine_name, null: false
      t.integer :level, null: false, default: 0
      t.text :message
      t.integer :user_id, null: false, default: 0
      t.timestamp :publish_at
      t.timestamp :unpublish_at

      t.timestamps
    end
    add_index :site_alerts, :machine_name, unique: true
  end
end
