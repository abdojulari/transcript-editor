class ApplicationController < ActionController::Base
  # include DeviseTokenAuth::Concerns::SetUserByToken
  include Authentication

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  # Allow us to use JBuilder
  include ActionController::ImplicitRender

  # Allow us to cache
  # include ActionController::Caching
  # self.perform_caching = true
  # self.cache_store = ActionController::Base.cache_store

  before_action :touch_session
  before_action :load_user_edits
  before_action :load_footer
  before_action :set_ie_headers
  before_action :load_app_config


  # Ensure a session id is available for all!
  def touch_session
    session[:touched] = 1
  end

  def load_user_edits
    current_user.total_edits ||= TranscriptEdit.getByUser(current_user.id).count if current_user
  end

  def authenticate_user
    # We allow non logged in users to edit the transcripts
    # raise ActionController::InvalidAuthenticityToken unless current_user
  end

  def load_app_config
    @app_config ||= AppConfig.instance
  end

  def load_footer
    site = Site.new
    @global_content = {
      footer_content: site.footer_content,
      footer_links: site.footer_links
    }
  end

  def set_ie_headers
    response.headers["X-UA-Compatible"] = "IE=edge"
  end
end
