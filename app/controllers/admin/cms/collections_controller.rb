class Admin::Cms::CollectionsController < Admin::ApplicationController
  def show
  end

  def new
    @resource = Collection.new
  end

  def create
    @resource = Collection.new(resource_params)

    if @resource.save
      flash[:notice] = t(".notice")
      redirect_to admin_cms_path()
    else
      flash[:errors] = t(".error")
      render "new"
    end
  end

  def edit
    @resource = Collection.find(params[:id])
  end

  def update
  end

  private

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
