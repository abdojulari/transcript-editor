module Admin::SummaryHelper
  include Admin::StatsHelper

  def prettify_duration(duration)
    Time.at(duration).utc.strftime("%Hh %Mm %Ss")
  end
end
