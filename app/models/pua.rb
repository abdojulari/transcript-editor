class Pua

  def initialize(options = {})
    @client = _getClient()
  end

  def createAudioFile(transcript, pua_item)
    # add an Audio File
    unless transcript[:audio_url].empty?
      @client.create_audio_file(pua_item, {
        remote_file_url: transcript[:audio_url]
      })
      # update status to audio-uploaded
      transcript_status = TranscriptStatus.find_by_name("audio_uploaded")
      transcript.update(transcript_status_id: transcript_status[:id])
      puts "Uploaded audio file #{transcript[:audio_url]} to Pop Up Archive"
    end
  end

  def createItem(transcript)
    # get collection
    collection = pua_client.get_collection(transcript.collection[:vendor_identifier])
    item = False

    # create a new Pop Up Archive item if identifier does not exist
    if transcript[:vendor_identifier].empty?
      item = @client.create_item(collection, {
        title: transcript[:title],
        description: transcript[:description]
      })

      # update transcript vendor identifier
      transcript.update(vendor_identifier: item["id"])
      puts "Created new item in Pop Up Archive with id: #{item["id"]}"

      # attempt to upload file
      createAudioFile(transcript, item)

    # otherwise, retrieve the item from Pop Up Archive
    else
      item = getItem(transcript)

      # upload audio file if no audio files found
      if item && item["audio_files"].length <= 0
        createAudioFile(transcript, item)
      end
    end

    item
  end

  def getItem(transcript)
    @client.get_item(transcript.collection[:vendor_identifier], transcript[:vendor_identifier])
  end

  def _getClient()
    PopUpArchive::Client.new(
      :id     => ENV['PUA_CLIENT_ID'],
      :secret => ENV['PUA_CLIENT_SECRET'],
      :debug  => false
    )
  end

end
