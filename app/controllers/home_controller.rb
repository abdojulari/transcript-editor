class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index, :transcripts]
  before_action :load_collection
  before_action :load_institutions
  layout "application_v2"

  include Searchable

  def index
    @selected_collection_id = build_params[:collection_id]
    @selected_institution_id = select_institution_id
    @transcripts = TranscriptService.search(build_params)
    @themes = Theme.all.order(name: :asc)
    @sort_list = SortList.list
  end

  def transcripts
    @selected_collection_id = build_params[:collection_id]
    @selected_institution_id = select_institution_id
    @transcripts = TranscriptService.search(build_params)
    @themes = Theme.all.order(name: :asc)
    @sort_list = SortList.list
  end
end
