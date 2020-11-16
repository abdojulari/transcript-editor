class CollectionsService
  def self.list
    Collection.all
  end

  def self.by_institution(institution_slug)
    institution_slug ||= Institution.state_library_nsw.try(:slug)

    Collection.published.order(title: :asc).joins(:institution).where("institutions.slug in (?)", institution_slug)
  end
end
