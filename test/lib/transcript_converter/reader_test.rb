require 'test_helper'
require_relative '../../../lib/transcript_converter/reader'

class ReaderTest < ActiveSupport::TestCase

  json_file = File.new(Rails.root + 'test/fixtures/lib/transcript_converter/cpb-aacip-106-0000000q-transcript.json' )
  text_file = File.new(Rails.root + 'test/fixtures/lib/transcript_converter/text_file.txt' )

  test "factory method returns JSONFile object for .json extension" do
    reader = TranscriptConverter::Reader.factory('.json', json_file)
    assert reader.is_a?(TranscriptConverter::Reader::JSONFile)
  end

  test "factory method errors if it no Reader is found" do
    error = assert_raises(RuntimeError) { TranscriptConverter::Reader.factory('.txt', text_file) }
    assert_equal("Unknown Reader for .txt file.", error.message)
  end
end
