require 'carrierwave/test/matchers'

RSpec.describe ImageUploader, type: :uploader do
  include CarrierWave::Test::Matchers

  let(:collection) { double('collection', :uid => 1) }
  let(:uploader) { ImageUploader.new(collection, :image) }

  before do
    ImageUploader.enable_processing = true
    File.open(Rails.root.join('spec', 'fixtures', 'image.jpg')) { |f| uploader.store!(f) }
  end

  after do
    ImageUploader.enable_processing = false
    uploader.remove!
  end

  context 'the thumb version' do
    it "scales down a landscape image to be exactly 64 by 64 pixels" do
      expect(uploader.thumb).to have_dimensions(100, 100)
    end
  end

  it "has the correct format" do
    expect(uploader).to be_format('JPEG')
  end
end
