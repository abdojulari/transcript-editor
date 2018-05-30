# sorting list for the homepage dropown
class SortList

  def self.list
    arr = []
    {
      random: 'Random',
      title_asc: 'Title (A to Z)',
      title_desc: 'Title (Z to A)',
      completeness_desc: 'Completeness (most to least)',
      completeness_asc: 'Completeness (least to most)',
      duration_asc: 'Duration (short to long)',
      duration_desc: 'Duration (long to short)',
      collection_id: 'Collection'

    }.each do |key, value|
      arr << OpenStruct.new(id: key, title: value)
    end
    arr
  end

end
