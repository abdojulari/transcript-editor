class Admin::Cms::CollectionsController < AdminController
  before_action :authenticate_staff!

  before_action :set_collection, only: [:show, :edit, :update]
  before_action :load_institutions, only: [:new, :create, :edit, :update]

  def show; end

  def new
    @collection = Collection.new
  end

  def create
    @collection = Collection.new(resource_params)

    if @collection.save
      flash[:notice] = "The new collection has been saved."
      redirect_to admin_cms_path
    else
      flash[:errors] = "The new collection could not be saved."
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @collection.update(resource_params)
      flash[:notice] = "The collection updates have been saved."
      redirect_to admin_cms_path
    else
      flash[:errors] = "The collection updates could not be saved."
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def load_institutions
    @institutions = InstitutionPolicy::Scope.new(current_user,
                                                 Institution).resolve
  end

  def set_collection
    @collection = Collection.find_by uid: params[:id]
  end

  def resource_params
    params.require(:collection).permit(
      :uid, :title,
      :library_catalogue_title, :description,
      :url, :image,
      :vendor_id, :institution_id
    ).merge(
      project_uid: ENV["PROJECT_ID"],
    )
  end
end
