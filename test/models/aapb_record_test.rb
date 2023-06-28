require_relative '../test_helper'
require 'nokogiri'

class AAPBRecordTest < ActiveSupport::TestCase
  test "fails without transcript url" do
    class FakeAAPBRecord < AAPBRecord
      def pbcore
        REXML::Document.new( File.read("#{Rails.root}/test/fixtures/lib/api_ingester/cpb-aacip-120-60qrfsvd-no-url.xml") )
      end
    end
    record = FakeAAPBRecord.new("cpb-aacip-120-60qrfsvd")
    assert record.errors == ["cpb-aacip-120-60qrfsvd does not have Transcript URL annotation!"]
  end

  test "fails without transcript data" do
    class FakeAAPBRecord < AAPBRecord
      def pbcore
        REXML::Document.new( File.read("#{Rails.root}/test/fixtures/lib/api_ingester/cpb-aacip-120-60qrfsvd.xml") )
      end
      def get_transcript_data(url)
        ""
      end
    end
    record = FakeAAPBRecord.new("cpb-aacip-120-60qrfsvd")
    assert record.errors == ["Transcript file was empty!"]
  end

  test "fails without org" do
    class FakeAAPBRecord < AAPBRecord
      def pbcore
        REXML::Document.new( File.read("#{Rails.root}/test/fixtures/lib/api_ingester/cpb-aacip-120-60qrfsvd-no-org.xml") )
      end
    end
    record = FakeAAPBRecord.new("cpb-aacip-120-60qrfsvd")
    assert record.errors == ["cpb-aacip-120-60qrfsvd does not have a pbcoreAnnotation type='organization'!"]
  end

  test "fails without collection" do
    class FakeAAPBRecord < AAPBRecord
      def pbcore
        REXML::Document.new( File.read("#{Rails.root}/test/fixtures/lib/api_ingester/cpb-aacip-120-60qrfsvd.xml") )
      end
    end
    record = FakeAAPBRecord.new("cpb-aacip-120-60qrfsvd")
    assert record.errors == ["Found no matching collection WQED-TV for record cpb-aacip-120-60qrfsvd!"]
  end
end
