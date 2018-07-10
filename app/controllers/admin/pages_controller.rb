class Admin::PagesController < AdminController
  before_action :set_page, only: [:edit, :update, :destroy, :show]

  def index
    authorize Page
    @pages = policy_scope(Page)
  end

  def edit
  end

  def show
    @page = @page.decorate
  end

  def update
    if  @page.update(page_params)
      redirect_to admin_pages_path
    else
      render :edit
    end
  end

  def destroy
    # institution.destroy
    # redirect_to admin_institutions_path
  end

  def upload
    @upload = CmsImageUpload.new(image: page_params[:image])
    @upload.save
    render json: { url: @upload.image.url, upload_id: @upload.id  }
  end

  private
    def set_page
      @page = Page.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def page_params
      params.require(:page).permit(:content, :page_type, :image, :published)
    end
end
