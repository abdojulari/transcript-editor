require 'open-uri'

module AAPB
  class DownloadTranscriptsJob
    attr_reader :transcripts_directory, :aapb_records

    def initialize(uids, project_key)
      raise "DownloadTranscriptsJob must be initialized with an Array of uids." unless uids.is_a?(Array)
      raise "No project transcripts directory found for: #{project_key}." unless File.directory?(Rails.root.join('project', project_key, 'transcripts'))

      @transcripts_directory = Rails.root.join('project', project_key, 'transcripts', 'aapb')
      Dir.mkdir(transcripts_directory) unless Dir.exist?(transcripts_directory)
      @aapb_records = build_appb_records(uids)
    end

    def run!
      download_transcripts
    end

    private

    def build_appb_records(uids)
      (uids[0..-1]).map do |id|
        AAPBRecord.new(id)
      end
    end

    def download_transcripts
      (aapb_records[0..-1]).each do |rec|
        begin
          if !File.exists?("#{transcripts_directory}/#{rec.uid}.json")
            puts "Downloading transcript for: #{rec.uid}."
            if rec.has_transcript_url?
              open("#{transcripts_directory}/#{rec.uid}.json", 'wb') do |file|
                file << open(rec.transcript_url).read
              end
            else
              puts "Skipping #{rec.uid}.json: no transcript_url"
            end
          else
            puts "Skipping #{rec.uid}.json: It already exists."
          end
        rescue OpenURI::HTTPError => e
          puts "No AAPB Record Found For: #{rec.uid}"
        end
      end
    end
  end
end
