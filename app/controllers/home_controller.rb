class HomeController < ApplicationController
  layout 'public'
  def index
    @collection = Collection.all
  end
end
