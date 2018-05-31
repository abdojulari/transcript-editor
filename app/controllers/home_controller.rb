class HomeController < ApplicationController
  layout 'public'
  def index
    @collection = Collection.all
    @sort_list = SortList.list
  end

  def transcripts
    @transcripts = TranscriptService.search(sort_params)
  end

  private
  def sort_params
    params.require(:data).permit(:collectionId, :sortId, :text)
  end
end
