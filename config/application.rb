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
    config.autoload_paths << Rails.root.join('lib', 'voicebase')

    # Disable assets
    config.assets.enabled = false

    # using sidekiq as the default queue
    config.active_job.queue_adapter = :sidekiq

    # API
    config.api_only = false

    config.to_prepare do
      layout = "application_v2"
      Devise::SessionsController.layout layout
      Devise::RegistrationsController.layout layout
      Devise::ConfirmationsController.layout layout
      Devise::UnlocksController.layout layout
      Devise::PasswordsController.layout layout
    end

    config.exception_handler = {
      dev: true,
      db: nil,
      email: nil,
      exceptions: {
        all: {
          layout: 'application_v2',
          notification: true,
        },
        :"4xx" => {
          layout: 'application_v2',
          notification: false,
        }
      }
    }
  end
end
