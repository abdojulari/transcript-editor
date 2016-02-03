class Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

  before_filter :set_user_session
  after_filter :handle_user_sessions

  def handle_user_sessions
    puts "Session After: #{session[:previously_not_logged_in]} , #{session.id}"

    # User just signed in, assume previous session belongs to user
    if session[:previously_not_logged_in] && user_signed_in?
      TranscriptEdit.updateUserSessions(session.id, current_user.id)
    end
  end

  def set_user_session
    puts "Session Before: #{session[:previously_not_logged_in]} , #{session.id}"

    session[:previously_not_logged_in] = false
    unless user_signed_in?
      session[:previously_not_logged_in] = true
    end
  end

end
