require 'rails_helper'

RSpec.describe Site, type: :model do
  let(:site) { Site.new }

  before(:each) do
    FactoryBot.create(:page, page_type: 'footer', published: true)
  end

  context "footer content" do
    it 'has footer content' do
      expect(site.footer_content).not_to be_empty
    end
  end

  context "footer links" do
    it 'has footer content' do
      expect(site.footer_links).to be_kind_of(Hash)
    end
  end
end
