class Admin::CmsController < Admin::ApplicationController
  before_filter :authenticate_admin!
  
  def show
    @collection = Collection.all
  end
end
