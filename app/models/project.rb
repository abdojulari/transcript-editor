class Project

  def self.getActive(collection_id: nil)
    project_file = Rails.root.join('project', ENV['PROJECT_ID'], 'project.json')
    project_data = File.read(project_file)

    if collection_id
      institution = Collection.find(collection_id).institution
      consensus =  {
        "maxLineEdits" => institution.max_line_edits,
        "minLinesForConsensus" => institution.min_lines_for_consensus,
        "minLinesForConsensusNoEdits" => institution.min_lines_for_consensus_no_edits,
        "minPercentConsensus" => institution.min_percent_consensus,
        "lineDisplayMethod" => institution.line_display_method,
        "superUserHiearchy" => institution.super_user_hiearchy,
      }
      project_data['consensus'] = consensus
    end
    {
      uid: ENV['PROJECT_ID'],
      data: JSON.parse(project_data)
    }
  end
end
