class AddTutotialToPages < ActiveRecord::Migration[5.2]
  def change
    page = Page.new(content: 'Tutorial', page_type: 'tutorial', published: false)
    page.save
    PublicPage.create(page: page, content: page.content)
  end
end
