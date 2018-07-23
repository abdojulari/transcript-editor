class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index, :transcripts]
  before_action :collection, except: [:index]
  layout 'public'

  def index
    @institutions = Institution.all
    @sort_list = SortList.list
  end

  def transcripts
    @selected_collection_id = sort_params[:collection_id].to_i
    @transcripts = TranscriptService.search(sort_params)
  end

  private

  def sort_params
    params.require(:data).permit(:collection_id, :sort_id, :text, :institution_id)
  end

  def collection
    if sort_params[:institution_id].to_i > 0
      @collection = Collection.where(institution_id: sort_params[:institution_id]).to_a
    else
      @collection = Collection.all.to_a.unshift(Collection.new(id: 0, title: "All Collections"))
    end
  end
end
