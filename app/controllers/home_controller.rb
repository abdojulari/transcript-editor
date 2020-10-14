class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index]
  before_action :load_collection
  before_action :load_institutions
  layout "application_v2"

  def index
    @transcripts = TranscriptService.search(build_params)
    @themes = Theme.all.order(name: :asc)
    @sort_list = SortList.list
  end

  private

  def sort_params
    params.permit(
      :sort_by, :search,
      :institution,
      themes: [],
      collections: []
    ).reject { |_, v| v.blank? }
  end

  def build_params
    sort_params.reject do |_key, value|
      value.blank? || value.to_s == "0" ||
        (value&.first && (value.first.blank? || value.first == "0"))
    end
  end

  def load_institutions
    @institutions = if sort_params[:collections].blank?
                      Institution.all.order(name: :asc)
                    else
                      Institution.order(name: :asc).joins(:collections).
                        where("collections.title in (?)", sort_params[:collections])
                    end
  end

  def load_collection
    collection = Collection.published.order(title: :asc)

    @collection = if sort_params[:institution].blank?
                    collection
                  else
                    collection.joins(:institution).
                      where("institutions.slug in (?)", sort_params[:institution])
                  end
  end
end
