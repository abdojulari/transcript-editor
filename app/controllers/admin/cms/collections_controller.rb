class Admin::Cms::CollectionsController < Admin::ApplicationController
  before_action :set_collection, only: [:show, :edit, :update]
  
  def show
  end

  def new
    @resource = Collection.new
  end

  def create
    @resource = Collection.new(resource_params)

    if @resource.save
      flash[:notice] = "The new collection has been saved."
      redirect_to admin_cms_path()
    else
      flash[:errors] = "The new collection could not be saved."
      render :new
    end
  end

  def edit
  end

  def update
    if @resource.update(resource_params)
      flash[:notice] = "The collection updates have been saved."
      redirect_to admin_cms_path()
    else
      flash[:errors] = "The collection updates could not be saved."
      render :edit
    end
  end

  private

  def set_collection
    @resource = Collection.find_by uid: params[:id]
  end

  def resource_params
    params.require(:collection).permit(
      :uid,
      :title,
      :call_number,
      :description,
      :url,
      :image_url,
      :vendor_id
    ).merge(
      project_uid: "nsw-state-library-amplify"
    )
  end
end
