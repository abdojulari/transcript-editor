class TranscriptEditPolicy < ApplicationPolicy
  attr_reader :user, :scope

  def initialize(user, scope)
    @user = user
    @scope = scope
  end

  class Scope < Scope
    # rubocop:disable Metrics/MethodLength
    def resolve(institution_id = nil)
      if @user.admin? && institution_id.nil?
        TranscriptEdit.all
      else
        ins_id = institution_id || @user.institution_id
        TranscriptEdit.
          select("transcript_edits.*").
          joins("INNER JOIN transcripts ON
                  transcript_edits.transcript_id = transcripts.id
                  INNER JOIN collections ON
                  transcripts.collection_id = collections.id").
          where("collections.institution_id = ?", ins_id)
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
