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

  def current_user_edits
    content_tag :span, current_user.total_edits, class: "score active"
  end

  #FIXME: this needs to be changed to the current time format
  def display_time(time)
    time_string = ""
    t =  Time.at(time).utc
    h = t.hour
    m = t.min
    s = t.sec

    if h > 0 && m > 0
      time_string = "#{h}h #{m}m"
    elsif m > 0 && s > 0
      time_string = "#{m}m #{s}s"
    elsif s > 0
      time_string = "#{s}s"
    end
    time_string
  end
end
