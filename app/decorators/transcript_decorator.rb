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

  def search_title
    "#{collection_title} - #{object.title}"
  end

  def humanize_duration(duration = object.duration)
    h.display_time(duration)
  end

  def humanize_contributors
    h.pluralize(object.users_contributed, 'contributor')
  end

  def display_percentage_edits
    (object.percent_edited - object.percent_reviewing - object.percent_completed)
  end

  def display_edited_percentage
    h.content_tag(:div, '', class: "item-status-bar edited", style: "width: #{object.percent_edited}%")
  end

  def display_completed_percentage
    h.content_tag(:div, '', class: "item-status-bar completed", style: "width: #{object.percent_completed}%")
  end

  def display_reviewing_percentage
    h.content_tag(:div, '', class: "item-status-bar reviewing", style: "width: #{object.percent_reviewing}%; left: #{object.percent_completed}%;")
  end

  def display_status_consensus
    display_status("#{object.percent_completed}% reached consensus", 'completed', object.percent_completed)
  end

  def display_status_reviewing
    display_status("#{object.percent_reviewing}% awaiting review", 'reviewing', object.percent_reviewing)
  end

  def display_status_edited
    display_status("#{object.percent_edited}% have edits", 'edited', object.percent_edited)
  end

  def has_started?
    object.percent_edited.to_i + object.percent_reviewing.to_i + object.percent_completed.to_i > 0
  end

  def display_status(text, klass, percentage)
    if klass != 'completed' && object.percent_completed < 100
      h.content_tag(:div, text, class: "item-status-text #{klass}") if percentage > 0
    end
  end
end
