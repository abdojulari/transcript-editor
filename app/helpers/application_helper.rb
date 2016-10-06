module ApplicationHelper
  def css_class_rails_environment
    "application-env-#{Rails.env.downcase}"
  end
end
