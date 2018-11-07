require 'transcript_converter/transcript_files'
require 'transcript_converter/reader'
require 'transcript_converter/converter'

module TranscriptConverter
  class Runner

    attr_reader :transcript_files_batches, :to_format, :directory

    def initialize(transcript_files_path, directory, to_format)
      raise "Directory doesn't exist at #{Rails.root + directory}" unless Dir.exist?(Rails.root + directory)
      @directory ||= Rails.root + directory
      @to_format ||= to_format
      @transcript_files_batches = TranscriptConverter::TranscriptFiles.new(transcript_files_path).files.in_groups_of(100,false)
    end

    def run!
      converters.each do |converter|
        converter.run!
      end
    end

    private

    def readers
      @readers ||= process_transcript_files_batches
    end

    def converters
      @converters ||= readers.map do |reader|
        TranscriptConverter::Converter.factory(to_format, reader.run!, directory)
      end
    end

    def process_transcript_files_batches
      readers = []
      transcript_files_batches.each do |batch|
        require 'pry';binding.pry
        batch.each do |file|
          readers << TranscriptConverter::Reader.factory(File.extname(File.basename(file.path)), file)
        end
      end
      readers
    end
  end
end
