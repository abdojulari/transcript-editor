class PageDecorator < ApplicationDecorator
  delegate_all

  def display_content
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer, extensions = {})
    markdown.render(object.content)
  end

end
