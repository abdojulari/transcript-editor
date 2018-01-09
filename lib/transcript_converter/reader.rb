require 'transcript_converter/reader/json_file'

module TranscriptConverter
  module Reader
    class << self
      # @return Set The set of all reader classes.
      def all_classes
        @all_classes ||= Set.new.tap do |all_classes|
          all_classes << TranscriptConverter::Reader::JSONFile
        end
      end

      def factory(extension, file)
        find_class_by_extension(extension).new(file)
      end

      def find_class_by_extension(extension)
        found_classes = all_classes.select do |reader|
          reader if reader::EXTENSIONS.include?(extension)
        end

        raise "Unknown Reader for #{extension} file." if found_classes.count == 0
        raise "Ambiguous Reader for #{extension} file." if found_classes.count > 1
        found_classes.first
      end
    end
  end
end
