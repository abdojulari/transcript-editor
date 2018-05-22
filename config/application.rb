require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TranscriptEditor
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Load extra libraries.
    config.autoload_paths << Rails.root.join('app', 'lib')

    # Disable assets
    config.assets.enabled = false

    # API
    config.api_only = false
  end
end
