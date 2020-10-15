module HomeSearch
  extend ActiveSupport::Concern

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
      value.blank? ||
        (value&.first && (value.first.blank? || value.first == "0"))
    end
  end
end
