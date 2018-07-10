require 'rails_helper'

RSpec.describe Page, type: :model do
  # associations
  it { should have_one(:public_page)  }

  # validations
  it { should validate_presence_of(:page_type)  }
  it { should validate_uniqueness_of(:page_type)  }
  it { should validate_uniqueness_of(:content)  }

  context "publishing a page" do
    let(:page) { FactoryBot.build(:page, published: published) }

    context "when published is clicked" do
      let!(:published) { true }

      it 'adds the record to public_pages' do
        expect do
          page.save
        end.to change { PublicPage.count }.by(1)
      end
    end

    context "when the page is on draft" do
      let!(:published) { false }

      it "doesn't update the public_pages" do
        expect do
          page.save
        end.to change { PublicPage.count }.by(0)
      end
    end
  end
end
