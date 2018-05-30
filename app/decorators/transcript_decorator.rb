class TranscriptDecorator < Draper::Decorator
  delegate_all

  def path
    "/transcripts/#{object.uid}"
  end

  def collection_title
    object.collection.title
  end

  def homepage_description
    Sanitize.fragment(object.description)
  end

  def humanize_duration
    Time.at(object.duration).utc.strftime("%H:%M:%S")
  end

  def humanize_contributors
    h.pluralize(object.users_contributed, 'contributor')
  end

  def display_percentage_edits
    (object.percent_edited - object.percent_reviewing - object.percent_completed)
  end
end
