class AddInstructionsPage < ActiveRecord::Migration[5.2]
  def change
   page = Page.new(content: 'Instructions', page_type: 'instructions', published: false)
   page.save
   PublicPage.create(page: page, content: page.content)
  end
end
