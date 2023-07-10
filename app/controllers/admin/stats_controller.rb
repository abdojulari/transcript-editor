class Admin::StatsController < AdminController
  before_action :authenticate_staff!

  def index
    authorize :stats, :index?

    @institutions = policy_scope(Institution)
    @stats = StatsService.new(current_user).all_stats
    @flags = Flag.pending_flags(current_user.institution_id)
  end

  def institution
    id = params[:id] ||= 0
    @stats = StatsService.new(current_user).transcript_edits(id)
  end
end
