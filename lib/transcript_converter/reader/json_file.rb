require 'json'

module TranscriptConverter
  module Reader
    class JSONFile

      attr_accessor :file

      EXTENSIONS = [ '.json' ]

      def initialize(file)
        raise ArgumentError, "File parameter must be a File object" unless file.is_a?(File)
        @file = file
      end

      def run!
        puts "Reading file: #{File.basename(file.path)}"
        parse_json
      end

      private

      def parse_json
        json = JSON.parse(File.read(file))
        raise "#{File.basename(file.path)}: JSON is not in the expected format." unless json.has_key?('parts')
        { "file_name" => "#{File.basename(file.path, '.json')}", "parts" => json["parts"] }
      end
    end
  end
end
