require 'test_helper'
require_relative '../../../lib/transcript_converter/converter'

class ConverterTest < ActiveSupport::TestCase

  content = { "id"=> 32095349, "text"=> "A.", "start_time" =>"5.43", "end_time" =>"22.05", "speaker_id" => 1620194 }

  directory = Rails.root + 'test/fixtures/lib/transcript_converter'

  test "factory method returns WebVtt object for .vtt extension" do
    converter = TranscriptConverter::Converter.factory('.vtt', content, directory)
    assert converter.is_a?(TranscriptConverter::Converter::WebVTTFile)
  end

  test "factory method errors if it no Converter is found" do
    error = assert_raises(RuntimeError) { TranscriptConverter::Converter.factory('.txt', content, directory) }
    assert_equal("Unknown Converter for .txt file.", error.message)
  end
end
