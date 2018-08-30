# public institutions controller
class InstitutionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index, :transcripts]
  layout 'public'

  def index
    @institution = Institution.friendly.find(params[:path])
    @collection = CollectionsService.list
    @sort_list = SortList.list
  rescue ActiveRecord::RecordNotFound
    render_404
  end

  private

  def render_404
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: "public", status: :not_found  }
      format.xml  { head :not_found  }
      format.any  { head :not_found  }
    end
  end
end
