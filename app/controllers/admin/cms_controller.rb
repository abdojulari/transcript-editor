class Admin::CmsController < AdminController
  def show
    authorize Collection

    # rubocop:disable Metrics/LineLength
    @collection = policy_scope(Collection).
      joins("INNER JOIN institutions ON collections.institution_id = institutions.id ").
      order("LOWER(institutions.name)")

    # rubocop:enable Metrics/LineLength
    @collection = @collection.group_by(&:institution_id)
  end
end
