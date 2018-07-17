class TranscriptEditPolicy < ApplicationPolicy
  attr_reader :user, :scope

  def initialize(user, scope)
    @user = user
    @scope = scope
  end

  class Scope < Scope
    def resolve
      if @user.admin?
        TranscriptEdit.all
      else
        TranscriptEdit.
          select("transcript_edits.*").
          joins("INNER JOIN transcripts ON transcript_edits.transcript_id = transcripts.id
                  INNER JOIN collections on transcripts.collection_id = collections.id").
          where("collections.institution_id = ?", @user.institution_id)
      end
    end
  end
end
