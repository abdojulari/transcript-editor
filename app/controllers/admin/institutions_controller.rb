class Admin::InstitutionsController < AdminController
  before_action :set_institution, only: [:edit, :update, :destroy]

  def index
    authorize Institution
    @institutions = Institution.all
  end

  def new
    authorize Institution

    @institution = Institution.new
  end

  def edit
  end

  def create
    @institution = Institution.new(institution_params)

    if @institution.save
      redirect_to admin_institutions_path
    else
      render :new
    end
  end

  def update
    if  @institution.update(institution_params)
      redirect_to admin_institutions_path
    else
      render :edit
    end
  end

  def destroy
    institution.destroy
    redirect_to admin_institutions_path
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_institution
      @institution = Institution.find(params[:id])
      authorize @institution
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def institution_params
      params.require(:institution).permit(:name)
    end
end
