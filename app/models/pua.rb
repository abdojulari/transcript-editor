class Pua

  def initialize(options = {})
    @client = _getClient()
  end

  def createItem(item)
    # get collection
    collection = pua_client.get_collection(item.collection[:vendor_identifier])

    # create a new Item
    new_item = @client.create_item(collection, {
      title: item[:title],
      description: item[:description]
    })
    puts "Uploaded new item to Pop Up Archive with id: #{new_item["id"]}"

    # add an Audio File
    unless item[:audio_url].empty?
      @client.create_audio_file(new_item, {
        remote_file_url: item[:audio_url]
      })
    end

    new_item
  end

  def getItem(item)
    @client.get_item(item.collection[:vendor_identifier], item[:vendor_identifier])
  end

  def _getClient()
    PopUpArchive::Client.new(
      :id     => ENV['PUA_CLIENT_ID'],
      :secret => ENV['PUA_CLIENT_SECRET'],
      :debug  => false
    )
  end

end
