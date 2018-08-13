class PageController < ApplicationController
  layout "public"

  def faq
    @page_title = "Frequently Asked Questions"
    load_page("faq")
  end

  def about
    load_page("about")
  end

  def tutotial
    load_page("tutorial")
  end

  def preview
    load_page(params[:id])
  end

  private

  def load_page(key)
    @page = Page.find_by(page_type: key)&.public_page&.decorate
    @page_title ||= key.humanize
    render template: 'page/show'
  end
end
