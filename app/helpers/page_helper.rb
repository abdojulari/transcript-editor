module PageHelper
  def should_be_checked?(box)
    return unless params.dig('data', 'collection_id').is_a? Array

    params.dig('data', 'collection_id').include?(box.object.id.to_s)
  end
end
