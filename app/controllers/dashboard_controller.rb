class DashboardController < ApplicationController
  before_action :authenticate_user!
  layout "public"

  def index
    @transcript_edits = TranscriptEdit.getByUser(current_user.id).joins(:transcript)
  end
end
