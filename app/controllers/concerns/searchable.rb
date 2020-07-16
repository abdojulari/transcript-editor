module Searchable
  extend ActiveSupport::Concern

  private

  def sort_params
    params.require(:data).permit(
      :sort_id, :text,
      :institution_id,
      theme: [],
      collection_id: []
    )
  end

  def build_params
    search_params.reject { |_key, value| value.blank? || value.to_s == "0" }
  end

  def search_params
    params.require(:data).permit(
      :q,
      :institution_id,
      theme: [],
      collection_id: []
    )
  end

  def select_institution_id
    # if the institution_id is != 0 then get it
    # if the collection id is != 0 then get that collections institution id
    # if the collection id == 0, then make the institution id also as 0
    if sort_params[:institution_id].to_i > 0
      sort_params[:institution_id].to_i
    else
      Collection.where(id: sort_params[:collection_id]).
        first&.institution_id.to_i
    end
  end

  def load_institutions
    new_institution = Institution.new(id: 0, name: "All Institutions")
    collection_ids = params[:data] && sort_params[:collection_id]
    @institutions = if collection_ids&.first&.to_i == 0
                      Institution.all.order(name: :asc)
                    else
                      Institution.order(name: :asc).joins(:collections).
                        where("collections.id = (?)", collection_ids)
                    end.to_a.unshift(new_institution)
  end

  def load_collection
    new_collection = Collection.new(id: 0, title: "All Collections")
    institution_id = params[:data] && sort_params[:institution_id]
    collection = Collection.published.order(title: :asc)
    @collection = if institution_id.to_i == 0
                    collection
                  else
                    collection.where(institution_id: institution_id)
                  end.to_a.unshift(new_collection)
  end
end
