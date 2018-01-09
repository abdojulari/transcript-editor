require 'test_helper'
require_relative '../../../lib/transcript_converter/transcript_files'

class TranscriptFilesTest < ActiveSupport::TestCase

  invalid_path = 'nothing/to/see/here'
  single_file = Rails.root + 'test/fixtures/lib/transcript_converter/cpb-aacip-106-0000000q-transcript.json'
  multiple_files = Rails.root + 'test/fixtures/lib/transcript_converter'

  test "TranscriptFiles initialization fails on invalid path" do
    error = assert_raises(RuntimeError) { TranscriptConverter::TranscriptFiles.new(invalid_path) }
    assert_equal("TranscriptFile requires a valid path to create", error.message)
  end

  test "TranscriptFiles object returns a single file in an array" do
    transcript_files = TranscriptConverter::TranscriptFiles.new(single_file)

    assert transcript_files.files.is_a?(Array)
    assert transcript_files.files.count == 1
  end

  test "TranscriptFiles object returns multiple files in an array" do
    transcript_files = TranscriptConverter::TranscriptFiles.new(multiple_files)

    assert transcript_files.files.count == 5
  end
end
