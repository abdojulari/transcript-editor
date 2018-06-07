class TranscriptService

  def self.search(params)
    # sorting order
    str = sort_string(params[:sortId])
    order_string = str.blank? ? 'id' : str
    ar_relation = Transcript.getForHomepage(params[:page], {order: order_string})
    # collection filtering
    ar_relation = ar_relation.where("transcripts.collection_id = #{params[:collectionId]}") if  params[:collectionId].to_i > 0

    # search text
    unless params[:text].blank?
      key = "%#{params[:text]}%"
      ar_relation = ar_relation.where("transcripts.title ILIKE :search or transcripts.description ILIKE :search", search: key)
    end
    ar_relation
  end

  def self.sort_string(sort_param)
    return nil if sort_param.to_s == "random"
    arr = sort_param.to_s.split("_")
    order = arr.pop
    column = arr.join("_")
    "#{column} #{order}"
  end
end
