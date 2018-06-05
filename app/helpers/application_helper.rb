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
end
