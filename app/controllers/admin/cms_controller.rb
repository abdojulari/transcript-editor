class Admin::CmsController < AdminController
  def show
    authorize Collection
    @collection = Collection.joins("INNER JOIN institutions ON collections.institution_id = institutions.id ").order("LOWER(institutions.name)")
    @collection = @collection.group_by { |i| i.institution_id }
  end
end
