require 'test_helper'
require_relative '../../../../lib/transcript_converter/reader/json_file'

class JSONFileTest < ActiveSupport::TestCase

  json_file = File.new(Rails.root + 'test/fixtures/lib/transcript_converter/cpb-aacip-106-0000000q-transcript.json' )
  invalid_file = File.new(Rails.root + 'test/fixtures/lib/transcript_converter/invalid.json')
  missing_parts_file = File.new(Rails.root + 'test/fixtures/lib/transcript_converter/missing-parts.json')
  empty_file = File.new(Rails.root + 'test/fixtures/lib/transcript_converter/empty.json')

  test "JSONFile returns JSON in expected format" do
    content = TranscriptConverter::Reader::JSONFile.new(json_file).run!

    part_one = { "id" => 32095349, "text" => "A.", "start_time" => "5.43", "end_time" => "22.05", "speaker_id" => 1620194 }
    part_last = { "id" => 32095660, "text" => "Ohio Avenue Cincinnati.", "start_time" => "1930.4", "end_time" => "1932.33", "speaker_id" => 1620246 }

    assert content["file_name"] == "cpb-aacip-106-0000000q-transcript"
    assert content["parts"].first == part_one
    assert content["parts"].last == part_last
  end

  test "JSONFile returns nil on invalid JSON" do
    assert nil == TranscriptConverter::Reader::JSONFile.new(invalid_file).run!
    assert nil == TranscriptConverter::Reader::JSONFile.new(empty_file).run!
  end

  test "JSONFile errors if it is missing 'parts' key" do
    error = assert_raises(RuntimeError) { TranscriptConverter::Reader::JSONFile.new(missing_parts_file).run! }
    assert_equal("#{File.basename(missing_parts_file.path)}: JSON is not in the expected format.", error.message)
  end
end
