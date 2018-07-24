class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index, :transcripts]
  before_action :collection, except: [:index]
  layout "public"

  def index
    @institutions = Institution.all
    @sort_list = SortList.list
    @themes = Theme.all
  end

  def transcripts
    @selected_collection_id = sort_params[:collection_id].to_i
    @transcripts = TranscriptService.search(sort_params)
  end

  private

  def sort_params
    params.require(:data).permit(
      :collection_id, :sort_id, :text,
      :institution_id,
      :theme
    )
  end

  def collection
    new_collection = Collection.new(id: 0, title: "All Collections")
    institution_id = sort_params[:institution_id].to_i
    @collection = if institution_id > 0
                    Collection.where(institution_id: institution_id)
                  else
                    Collection.all
                  end.to_a.unshift(new_collection)
  end
end
