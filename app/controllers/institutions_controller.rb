# public institutions controller
class InstitutionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index, :transcripts]
  layout 'public'

  def index
    @institution = Institution.friendly.find(params[:path])
    @collection = CollectionsService.list
    @sort_list = SortList.list
  end
end
