class SearchController < ApplicationController
  layout 'public'

  def index
    @collection = Collection.all
  end

  def query
    @transcripts = Transcript.search(build_params)
    @query = build_params[:q]
  end

  private

  def build_params
    # remove 0 or empty params
    search_params.reject { |key, value| value.blank? || value.to_s == "0"  }
  end

  def search_params
    params.permit(:sort_by, :order, :collection_id, :q, :page, :deep)
  end
end
