class Site
  attr_accessor :footer_content, :footer_links

  def initialize
    @footer_links ||= links
    @footer_content = footer_str
  end

  def footer_str
    PublicPage.joins(:page).where("pages.page_type = 'footer'").first.try(:content)
  end

  def links
    YAML.load_file('config/footer.yml')
  end
end
