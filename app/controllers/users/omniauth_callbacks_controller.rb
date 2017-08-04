class Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

  before_filter :set_user_session, except: [:redirect_callbacks]
  after_filter :handle_user_sessions, except: [:redirect_callbacks]

  def handle_user_sessions
    set_user_session unless session.key?(:previously_not_logged_in)
    # puts "Session After: #{session[:previously_not_logged_in]} , #{session.id}"

    # User just signed in
    if session[:previously_not_logged_in] && user_signed_in?
      restore_previous_session
    end
  end

  def set_user_session
    session[:previously_not_logged_in] = false
    unless user_signed_in?
      session[:previously_not_logged_in] = true
    end
  end

  # Override for redirect_callbacks in devise_token_auth.
  def redirect_callbacks
    request.env['omniauth.params'] = {} unless request.env.key?('omniauth.params')
    request.env['omniauth.params']['namespace_name'] = nil
    request.env['omniauth.params']['resource_class'] = 'User'
    
    # derive target redirect route from 'resource_class' param, which was set
    # before authentication.
    devise_mapping = [omniauth_params['namespace_name'],
                      omniauth_params['resource_class'].underscore.gsub('/', '_')].compact.join('_')
    path = "#{Devise.mappings[devise_mapping.to_sym].fullpath}/#{params[:provider]}/callback"
    redirect_route = URI::HTTP.build(scheme: request.scheme, host: request.host, port: request.port, path: path).to_s

    # preserve omniauth info for success route. ignore 'extra' in twitter
    # auth response to avoid CookieOverflow.
    session['dta.omniauth.auth'] = request.env['omniauth.auth'].except('extra')
    session['dta.omniauth.params'] = omniauth_params
    tweak_session_attrs

    if session['dta.omniauth.params']
      redirect_to action: 'omniauth_success'
    else
      redirect_to action: 'omniauth_failure'
    end
  end

  private

  # Ensure that the info hash is properly populated.
  # Needs email address at least.
  def tweak_session_attrs
    if session['dta.omniauth.auth']['provider'] == 'saml' && ENV['SAML_NAME_ID_FORMAT'] == 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
      unless session['dta.omniauth.auth']['info']['email']
        session['dta.omniauth.auth']['info']['email'] = session['dta.omniauth.auth']['uid']
      end
    end
  end

  def restore_previous_session
    puts current_user.inspect
    # Assume previous session belongs to user
    TranscriptEdit.updateUserSessions(session.id, current_user.id)
    Flag.updateUserSessions(session.id, current_user.id)

    # Check if user is an admin
    project = Project.getActive
    admin_emails = project[:data]["adminEmails"]
    if admin_emails.include?(current_user.email) && (!current_user.user_role || current_user.user_role.name != "admin")
      current_user.setRole("admin")
    end
  end
end
