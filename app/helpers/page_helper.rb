module PageHelper
  def themes_checked?(box)
    return unless params[:themes].is_a? Array

    params[:themes].include?(box.object.name.to_s)
  end

  def collection_checked?(box)
    return unless params[:collections].is_a? Array

    params[:collections].include?(box.object.title.to_s)
  end
end
