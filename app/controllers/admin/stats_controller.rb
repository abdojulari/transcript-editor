class Admin::StatsController < AdminController
  before_action :authenticate_moderator!

  def index
    authorize :stats, :index?

    @stats = StatsService.new(current_user).all_stats
    @flags = Flag.getUnresolved()
  end
end
