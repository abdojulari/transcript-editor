class Admin::StatsController < AdminController
  before_action :authenticate_staff!

  def index
    authorize :stats, :index?

    @stats = StatsService.new(current_user).all_stats
    @flags = Flag.pending_flags(current_user.institution_id)
  end
end
