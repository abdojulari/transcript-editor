class SearchController < ApplicationController
  before_action :load_collection, except: [:index]
  before_action :load_institutions

  layout "application_v2"

  include Searchable

  def index
    @collection = Collection.published
    @themes = Theme.all.order(name: :asc)
    @page_title = "Search"
    @build_params = build_params
  end

  def query
    @selected_collection_id = sort_params[:collection_id]
    @selected_institution_id = select_institution_id
    @transcripts = Transcript.search(build_params)
    @query = build_params[:q]
    @build_params = build_params
  end
end
