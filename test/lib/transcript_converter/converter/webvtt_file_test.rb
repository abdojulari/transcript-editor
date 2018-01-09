require 'test_helper'
require_relative '../../../../lib/transcript_converter/converter/webvtt_file'

class WebVTTFileTest < ActiveSupport::TestCase

  content = { "file_name" => 'test',
              "parts" => [
                { "id" => 32095349, "text" => "A.", "start_time" =>"5.43", "end_time" =>"22.05", "speaker_id" => 1620194 },
                { "id" => 32095350, "text" => "In today's broadcast world of compact discs and satellite programming it's hard to", "start_time" => "25.86", "end_time" => "30.43", "speaker_id" => 1620195}
              ]
            }

  directory = Rails.root + 'test/fixtures/lib/transcript_converter'

  test "WebVTT creates a file in the expected location with the expected content" do
    file = TranscriptConverter::Converter::WebVTTFile.new(content, directory).run!
    generated_content = File.open(file).read
    test_content = "WEBVTT\n\n00:00:05.429 --> 00:00:22.050\nA.\n\n00:00:25.859 --> 00:00:30.429\nIn today's broadcast world of compact discs and satellite programming it's hard to\n\n"

    assert File.exist?(directory + "#{content['file_name']}.vtt")
    assert generated_content.include?(test_content)

    File.delete(directory + "#{content['file_name']}.vtt")
  end
end
