class TranscriptLine < ActiveRecord::Base

  include PgSearch
  multisearchable :against => [:original_text, :text]

  belongs_to :transcript
  has_many :transcript_edits

  default_scope { order(:sequence) }

  # Update the line's status and best-guess text based on contributed edits
  def recalculate(edits=nil, project=nil)
    edits ||= TranscriptEdit.where(transcript_line_id: id)
    project ||= Project.getActive
    statuses = TranscriptLineStatus.allCached

    # Init status & text
    status_id = 1
    best_guess_text = original_text
    final_text = ""

    # Filter out blank text or text that is the original text
    edits_filtered = []
    if edits.length > 1
      edits_filtered = edits.select { |edit| !edit[:text].blank? && edit[:text] != original_text }
    end

    best_edit = chooseBestEdit(edits_filtered)

    # Set best guess text
    unless best_edit.nil? || best_edit[:edit].nil?
      best_guess_text = best_edit[:edit][:text]
    end

    # Retrieve consensus settings
    consensus = project[:data]["consensus"]

    # Candidate for consensus
    if edits_filtered.length >= consensus["minLinesForConsensus"]
      unless best_edit.nil? || best_edit[:group].nil?
        # Determine what percent agree
        percent_agree = 1.0 * best_edit[:group][:count] / edits_filtered.length
        # puts "Best Edit #{best_edit}"
        # Mark as completed
        if percent_agree >= consensus["minPercentConsensus"]
          completed_status = statuses.find{|s| s[:name]=="completed"}
          status_id = completed_status[:id]
          final_text = best_guess_text
        end
      end
    end

    # Ready for review
    if status_id <= 1 && edits_filtered.length >= consensus["maxLineEdits"]
      reviewing_status = statuses.find{|s| s[:name]=="reviewing"}
      status_id = reviewing_status[:id]
    end

    # Edits have been received
    if status_id <= 1 && edits_filtered.length > 0
      editing_status = statuses.find{|s| s[:name]=="editing"}
      status_id = editing_status[:id]
    end

    # Update line if it has changed
    if status_id != transcript_line_status_id || best_guess_text != guess_text
      update_attributes(transcript_line_status_id: status_id, guess_text: best_guess_text, text: final_text)
    end
  end

  private

  def chooseBestEdit(edits)
    best_group = nil
    best_edit = nil

    # Init to selecting the first
    best_group = {text: edits[0].normalizedText, count: 1} if edits.length > 0
    best_edit = edits[0] if edits.length > 0

    if edits.length > 1

      # Group the edits by normalized text
      groups = edits.group_by{|edit| edit.normalizedText}
      # Convert groups from hash to array
      groups = groups.collect {|group_text, group_edits| {text: group_text, count: group_edits.length} }
      # Sort by frequency of text
      groups = groups.sort_by { |group| group[:count] * -1 }
      best_group = groups[0]

      # No group has more than one edit; treat them all the same
      best_edits = edits.select {|edit| true }
      # There's a group that has more than one edit, choose the one with the most
      if best_group[:count] > 1
        # Retrieve the edits based on the best group's text
        best_edits = edits.select { |edit| edit.normalizedText==best_group[:text] }
      end

      # Sort the edits
      best_edits = best_edits.sort_by { |edit|
        score = 0
        score -= 1 if edit[:text] =~ /\d/ # Plus 1 if contains a number
        score -= 1 if edit[:text] =~ /[A-Z]/ # Plus 1 if contains uppercase
        score -= 1 if edit[:text] =~ /[^0-9A-Za-z ]/ # Plus 1 if contains punctuation
        score -= 4 if edit[:user_id] > 0 # Give a preference to signed-in users
        score
      }
      # puts "Best Edits #{best_edits}"
      best_edit = best_edits[0]
    end

    {
      edit: best_edit,
      group: best_group
    }
  end

end
