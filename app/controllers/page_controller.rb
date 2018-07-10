class PageController < ApplicationController
  layout 'public'

  def faq
    @page = Page.find_by(page_type: 'faq').public_page.decorate
  end

  def about
    @page = Page.find_by(page_type: 'about').public_page.decorate
  end
end
