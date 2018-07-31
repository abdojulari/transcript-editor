module Publishable
  extend ActiveSupport::Concern

  included do
    default_scope { where.not(published_at: nil) }
    attr_accessor :publish

    after_save :publish_if_needed
  end

  def publish_if_needed
    publish! if publish.to_i == 1
  end

  def published?
    !!published_at
  end

  def publish!
    update_column('published_at', Time.current)
  end
end
