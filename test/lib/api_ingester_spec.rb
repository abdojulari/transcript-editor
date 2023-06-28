require_relative '../test_helper'
require_relative '../../lib/api_ingester'
require_relative '../../app/models/aapb_record'

class APIIngesterTest < ActiveSupport::TestCase
  test "valid pbcore with collection present" do
    Collection.create(uid: "WQED-TV")
    ingester = APIIngester.new(["cpb-aacip-120-60qrfsvd"])
    ingester.run!
    assert ingester.errors.empty?
  end

  test "valid pbcore with missing annotations fails with correct errors" do
    ingester = APIIngester.new(["cpb-aacip-silliness"])
    ingester.run!
    assert ingester.errors == {"cpb-aacip-silliness"=>["PBCore file was not accessible!"]}
  end
end
