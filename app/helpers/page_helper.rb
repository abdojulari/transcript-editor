module PageHelper
  def themes_checked?(box)
    return unless @build_params[:themes].is_a? Array

    @build_params[:themes].include?(box.object.name.to_s)
  end

  def collection_checked?(box)
    return unless @build_params[:collections].is_a? Array

    @build_params[:collections].include?(box.object.title.to_s)
  end

  def collection_id_checked?(box)
    return unless @build_params[:collection_id].is_a? Array

    @build_params[:collection_id].include?(box.object.title.to_s)
  end
end
