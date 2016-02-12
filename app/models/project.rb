class Project < ActiveRecord::Base

  def self.getActive
    Rails.cache.fetch("active_project", expires_in: 1.day) do
      Project.where(active: true).first
    end
  end

end
