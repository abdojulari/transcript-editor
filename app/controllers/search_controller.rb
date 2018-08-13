class SearchController < ApplicationController
  layout "public"

  def index
    new_collection = Collection.new(id: 0, title: "All Collections")
    @collection = Collection.published.to_a.unshift(new_collection)
    @page_title = "Search"
  end

  def query
    @transcripts = Transcript.search(build_params)
    @query = build_params[:q]
  end

  private

  def build_params
    search_params.reject { |_key, value| value.blank? || value.to_s == "0" }
  end

  def search_params
    params.permit(:sort_by, :order, :collection_id, :q, :page, :deep)
  end
end
