require 'open-uri'

module AAPB
  class DeleteTranscriptsJob
    attr_reader :uids

    def initialize(uids)
      raise "DeleteTranscriptsJob must be initialized with an Array of uids." unless uids.is_a?(Array)
      @uids = uids
    end

    def run!
      delete_transcripts
    end

    private

    def delete_transcripts
      uids.each do |uid|
        Transcript.find_by_uid(uid).delete
      end
    end
  end
end
