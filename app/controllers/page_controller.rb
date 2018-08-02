class PageController < ApplicationController
  layout "public"

  def faq
    load_page("faq")
  end

  def about
    load_page("about")
  end

  def tutotial
    load_page("tutorial")
  end

  private

  def load_page(key)
    @page = Page.find_by(page_type: key).public_page.decorate
  end
end
