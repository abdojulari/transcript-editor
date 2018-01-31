require 'csv'
require 'test_helper'
require_relative '../../../lib/aapb/transcript_seeds_job'

class TranscriptSeedsJobTest < ActiveSupport::TestCase

  one_id = ['cpb-aacip/301-00000079']
  multiple_ids = ['cpb-aacip/301-00000079','cpb-aacip/301-010p2nnc','cpb-aacip_301-042rbphg']
  multiple_row_csv = AAPB::TranscriptSeedsJob.new(multiple_ids, 'sample-project').run
  test_path = Rails.root.join('project', 'sample-project', 'data')

  test '#initialize' do
    assert AAPB::TranscriptSeedsJob.new(one_id, 'sample-project').aapb_records.length == 1
    assert AAPB::TranscriptSeedsJob.new(multiple_ids, 'sample-project').aapb_records.length == 3
  end

  test '#run with multiple ids' do
    multiple_row_csv
    assert CSV.foreach("#{test_path}" + "/" + "#{Date.today}.csv", headers: true).count == 3
    File.delete("#{test_path}" + "/" + "#{Date.today}.csv")
  end
end
