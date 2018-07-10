class Page < ApplicationRecord
  has_one :public_page

  validates :page_type, presence: true
  validates :content, uniqueness: true
  validates :page_type, uniqueness: true

  after_save do
    if published
      public_page = PublicPage.where(page_id: id).first_or_initialize
      public_page.content = content
      public_page.save
    end
  end
end
