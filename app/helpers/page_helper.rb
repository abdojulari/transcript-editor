module PageHelper
  def themes_checked?(box)
    return unless params.dig(:data, :theme).is_a? Array

    params.dig(:data, :theme).include?(box.object.name.to_s)
  end

  def collection_checked?(box)
    return unless params.dig(:data, :collection_id).is_a? Array
    binding.pry
    params.dig(:data, :collection_id).include?(box.object.id.to_s)
  end
end
