module ApplicationHelper

  def project_name

  end

  def project_description

  end

  def data_title_template

  end

  def staging?
    Rails.env.staging?
  end

  #FIXME: this needs to be changed to the current time format
  def display_time(time)
    Time.at(time).utc.strftime("%H:%M:%S")
  end
end
