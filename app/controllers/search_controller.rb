class SearchController < ApplicationController
  before_action :load_collection, except: [:index]
  before_action :load_institutions

  layout "application_v2"

  include Searchable

  def index
    new_collection = Collection.new(id: 0, title: "All Collections")
    @collection = Collection.published.to_a.unshift(new_collection)
    @themes = Theme.all.order(name: :asc)
    @page_title = "Search"
    @form_path = query_search_index_url
    @form_method = :get
  end

  def query
    @selected_collection_id = sort_params[:collection_id].to_i
    @selected_institution_id = select_institution_id
    @transcripts = Transcript.search(build_params)
    @query = build_params[:q]
  end

  private

  def build_params
    search_params.reject { |_key, value| value.blank? || value.to_s == "0" }
  end

  def search_params
    params.require(:data).permit(:collection_id, :q,
                                 :institution_id, :theme)
  end
end
