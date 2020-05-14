class DailyAnalyticsJob < ApplicationJob
  queue_as :default

  def perform
    # cache analytics data
    Institution.all_institution_disk_usage
  end
end
