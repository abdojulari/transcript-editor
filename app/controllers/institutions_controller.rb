# public institutions controller
class InstitutionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index]
  before_action :load_collection
  before_action :load_institutions
  before_action :filter_requests, only: [:index]

  layout "application_v2"

  include Searchable

  def index
    @sort_list = SortList.list
    @themes = Theme.all

    @institution = Institution.friendly.find(params_list[:institution_id])
    @selected_institution_id = @institution.id

    @selected_collection_id = @institution.collections.
      where(uid: params_list[:collection_id]).first.try(:id) if @institution

    @transcripts = TranscriptService.search(build_params)

    load_institution_footer
  rescue ActiveRecord::RecordNotFound
    render_404
  end

  private

  def load_institution_footer
    @global_content[:footer_links] = @institution.institution_links
  end

  def render_404
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: "public", status: :not_found  }
      format.xml  { head :not_found  }
      format.any  { head :not_found  }
    end
  end

  def params_list
    list = params[:path].to_s.split("/")
    {
      institution_id: list.shift,
      collection_id: list.shift
    }
  end

  def filter_requests
    return head :not_found if (params[:format] && params[:format] != "html")
  end
end
