class HomeController < ApplicationController
  layout 'public'
  def index
    @collection = Collection.all
    @sort_list = SortList.list
  end

  def transcripts
    @transcripts = Transcript.getForHomepage(params[:page], {order: 'id'})
  end
end
