class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index, :transcripts]
  before_action :load_collection
  before_action :load_institutions
  layout "application_v2"

  include Searchable

  def index
    @sort_list = SortList.list
    @themes = Theme.all.order(name: :asc)
    @form_path = transcripts_home_index_url
    @form_method = :post
  end

  def transcripts
    @selected_collection_id = sort_params[:collection_id]
    @selected_institution_id = select_institution_id
    @transcripts = TranscriptService.search(sort_params)
    @themes = Theme.all.order(name: :asc)
    @sort_list = SortList.list
  end
end
