require 'test_helper'
require_relative '../../../lib/transcript_converter/runner'

class RunnerTest < ActiveSupport::TestCase

  invalid_path = 'nothing/to/see/here'
  single_file = Rails.root + 'test/fixtures/lib/transcript_converter/cpb-aacip-106-0000000q-transcript.json'
  multiple_files = Rails.root + 'test/fixtures/lib/transcript_converter'
  directory = Rails.root + 'test/fixtures/lib/transcript_converter'
  to_format = 'vtt'

  test "Runner initializes with single TranscriptFile" do
    runner = TranscriptConverter::Runner.new(single_file, directory, to_format)
    assert runner.transcript_files.count == 1
  end

  test "Runner initializes with multiple TranscriptFiles" do
    runner = TranscriptConverter::Runner.new(multiple_files, directory, to_format)
    assert runner.transcript_files.count == 5
  end
end
