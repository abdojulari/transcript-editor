class CollectionsService
  def self.list
    Collection.all
  end

  def self.by_institution(institution_id)
    id = if institution_id.to_i == 0
           # 0 or nil consider as NSW state library
           Institution.state_library_nsw.try(:id)
         else
           institution_id
         end
    Collection.where(institution_id: id)
  end
end
