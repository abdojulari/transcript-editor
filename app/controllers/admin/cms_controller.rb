class Admin::CmsController < AdminController
  def show
    @collection = policy_scope(Collection).group_by { |i| i.institution_id }
  end
end
