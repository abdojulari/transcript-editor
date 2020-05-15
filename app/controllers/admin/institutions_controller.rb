class Admin::InstitutionsController < AdminController
  before_action :set_institution, only: [:edit, :update, :destroy]

  def index
    @institutions = policy_scope(Institution).order("LOWER(name)")
  end

  def new
    authorize Institution

    @institution = Institution.new
  end

  def edit; end

  def create
    authorize Institution

    @institution = Institution.new(institution_params)

    if @institution.save
      redirect_to admin_institutions_path
    else
      render :new
    end
  end

  def update
    authorize Institution

    save_institution_links

    if @institution.update(institution_params)
      redirect_to admin_institutions_path
    else
      render :edit
    end
  end

  def destroy
    authorize Institution

    institution.destroy
    redirect_to admin_institutions_path
  end

  private

  def save_institution_links
    InstitutionLink.where(institution: @institution).delete_all

    institution_links_params[:institution_links].to_a.each do |link|
      InstitutionLink.create(title: link[:title], url: link[:url], position: link[:position], institution: @institution)
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_institution
    @institution = Institution.friendly.find(params[:id])
    authorize @institution
  end

  def institution_params
    params.require(:institution).permit(
      :name, :url, :image, :slug, :hero_image,
      :introductory_text, :min_lines_for_consensus
    )
  end

  def institution_links_params
    params.require(:institution).permit(institution_links: [:title, :url, :position])
  end
end
