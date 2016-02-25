class Project < ActiveRecord::Base

  def self.getActive
    Rails.cache.fetch("project_#{ENV['PROJECT_ID']}", expires_in: 1.hour) do
      Project.find_by uid: ENV['PROJECT_ID']
    end
  end

end
