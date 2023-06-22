require 'csv'
require 'uri'
require 'open-uri'

module AAPB
  class TranscriptSeedsJob
    attr_reader :aapb_records, :csv_file_path

    def initialize(uids, project_key)
      raise "TranscriptSeedsJob must be initialized with an Array of uids." unless uids.is_a?(Array)
      raise "No project directory found for: #{project_key}." unless File.directory?(Rails.root.join('project', project_key))

      @csv_file_path = Rails.root.join('project', project_key, 'data')
      @aapb_records = build_appb_records(uids)
    end

    def run!
      build_csv
    end

    private

    def build_appb_records(uids)
      (uids[0..-1]).map do |id|
        AAPBRecord.new(id)
      end
    end

    def build_csv
      CSV.open("#{csv_file_path}/#{Date.today}.csv", "w") do |csv|
        csv << [ 'uid', 'title', 'description', 'url', 'audio_url', 'image_url', 'collection', 'vendor', 'vendor_identifier', 'notes' ]
        (aapb_records[0..-1]).map do |rec|
          puts "Processing AAPBRecord: #{rec.uid}."
          begin
            csv << [ rec.uid, rec.title, rec.description, rec.aapb_url, rec.audio_url, rec.image_url, rec.organization_pbcore_name, 'webvtt', "#{rec.uid}.vtt",  ]
          rescue OpenURI::HTTPError => e
            puts "No AAPB Record Found For: #{rec.uid}"
          end
        end
      end
    end
  end
end
