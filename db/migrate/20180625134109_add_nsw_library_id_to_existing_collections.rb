class AddNswLibraryIdToExistingCollections < ActiveRecord::Migration[5.2]
  def change
    institution = Institution.new(name: 'state library new south wales')
    institution.save

    # update existing collections
    Collection.update_all(institution_id: institution.id)
  end
end
