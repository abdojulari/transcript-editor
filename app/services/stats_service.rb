class StatsService
  attr_accessor :user

  def initialize(user)
    @user = user
  end

  def all_stats
    {
      transcript_edits: transcript_edits,
      user_registration_stats: user_registrations,
    }
  end

  def transcript_edits(institution_id = nil)
    {
      all: get_stats_by_day(institution_id).length,
      past_30_days: past_n_days(institution_id, 30).length,
      past_7_days: past_n_days(institution_id, 7).length,
      past_24_hours: past_n_days(institution_id, 1).length,
    }
  end

  def user_registrations
    {
      all: user_get_stats_by_day.length,
      past_30_days: user_past_n_days(30).length,
      past_7_days: user_past_n_days(7).length,
      past_24_hours: user_past_n_days(1).length,
    }
  end

  def past_n_days(institution_id, days)
    get_stats_by_day(institution_id).
      where(created_at: days.days.ago..Time.zone.now)
  end

  def user_past_n_days(days)
    user_get_stats_by_day.
      where(created_at: days.days.ago..Time.zone.now)
  end

  private

  # original query
  def get_stats_by_day(institution_id)
    TranscriptEditPolicy::Scope.new(user, TranscriptEdit).
      resolve(institution_id)
  end

  def user_get_stats_by_day
    UserPolicy::Scope.new(user, User).resolve
  end
end
