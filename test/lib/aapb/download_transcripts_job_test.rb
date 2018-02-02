require 'fileutils'
require 'test_helper'
require_relative '../../../lib/aapb/download_transcripts_job'

class DownloadTranscriptsJobTest < ActiveSupport::TestCase

  one_id = ['cpb-aacip/301-00000079']
  multiple_ids = ['cpb-aacip/301-00000079','cpb-aacip/301-010p2nnc','cpb-aacip_301-042rbphg']
  test_path = Rails.root.join('project', 'sample-project', 'transcripts', 'aapb')
  multiple_file_download = AAPB::DownloadTranscriptsJob.new(multiple_ids, 'sample-project').run

  test '#initialize' do
    assert AAPB::DownloadTranscriptsJob.new(one_id, 'sample-project').aapb_records.length == 1
    assert AAPB::DownloadTranscriptsJob.new(multiple_ids, 'sample-project').aapb_records.length == 3
    assert Dir.exist?(test_path)
  end

  test '#run with multiple ids' do
    multiple_file_download
    assert Dir.glob("#{test_path}/*").length == 3
    FileUtils.rm_rf(test_path)
  end
end
