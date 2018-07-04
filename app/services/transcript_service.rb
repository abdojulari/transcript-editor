class TranscriptService

  def self.search(params)
    Transcript.get_for_home_page(params)
  end
end
