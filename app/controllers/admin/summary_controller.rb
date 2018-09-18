class Admin::SummaryController < AdminController
  before_action :authenticate_staff!

  def index
    @collection = policy_scope(Collection).none
    @institutions = policy_scope(Institution)
    @stats = StatsService.new(current_user).completion_stats
  end

  def details
    @collection = policy_scope(Collection).
      where(institution_id: params[:institution_id].to_i)
    @stats = StatsService.new(current_user).
      completion_stats(institution_id, collection_id)
  end

  private

  def collection_id
    params[:collection_id].to_i > 0 ? params[:collection_id].to_i : nil
  end

  def institution_id
    params[:institution_id].to_i > 0 ? params[:institution_id].to_i : nil
  end
end
