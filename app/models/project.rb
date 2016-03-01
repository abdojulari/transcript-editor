class Project

  def self.getActive
    project_file = Rails.root.join('project', ENV['PROJECT_ID'], 'project.json')
    project_data = File.read(project_file)
    {
      uid: ENV['PROJECT_ID'],
      data: JSON.parse(project_data)
    }
  end

end
