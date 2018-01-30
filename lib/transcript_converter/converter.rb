require 'transcript_converter/converter/webvtt_file'

module TranscriptConverter
  module Converter
    class << self
      # @return Set The set of all converter classes.
      def all_classes
        @all_classes ||= Set.new.tap do |all_classes|
          all_classes << TranscriptConverter::Converter::WebVTTFile
        end
      end

      def factory(extension, content, directory)
        find_class_by_extension(extension).new(content, directory)
      end

      def find_class_by_extension(extension)
        found_classes = all_classes.select do |converter|
          converter if converter::EXTENSIONS.include?(extension)
        end

        raise "Unknown Converter for #{extension} file." if found_classes.count == 0
        raise "Ambiguous Converter for #{extension} file." if found_classes.count > 1
        found_classes.first
      end
    end
  end
end
