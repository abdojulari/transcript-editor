class Admin::SummaryController < AdminController
  before_action :authenticate_staff!

  def index
    @collection = policy_scope(Collection).none
    @institutions = policy_scope(Institution)
    load_stats(nil, nil)
  end

  def details
    @collection = policy_scope(Collection).
      where(institution_id: params[:institution_id].to_i)
    @selected_collection_id = collection_id
    load_stats(institution_id, collection_id)
  end

  private

  def load_stats(institution_id, collection_id)
    service = StatsService.new(current_user)

    completion_stats = service.completion_stats(institution_id, collection_id)
    @total = completion_stats.extract!(:total)
    @stats = completion_stats

    @disk_usage = service.disk_usage(institution_id, collection_id)
  end

  def collection_id
    params[:collection_id].to_i > 0 ? params[:collection_id].to_i : nil
  end

  def institution_id
    params[:institution_id].to_i > 0 ? params[:institution_id].to_i : nil
  end
end
