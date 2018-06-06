class PageController < ApplicationController
  layout 'public'

  def faq
    @page = Page.find_by(page_type: 'faq').decorate
  end

  def about
    @page = Page.find_by(page_type: 'about').decorate
  end
end
