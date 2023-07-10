class AddUrlToInstitutions < ActiveRecord::Migration[5.2]
  def change
    add_column :institutions, :url, :string
  end
end
