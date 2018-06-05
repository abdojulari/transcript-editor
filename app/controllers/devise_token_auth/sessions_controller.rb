module DeviseTokenAuth
  class SessionsController < DeviseTokenAuth::ApplicationController
    before_action :set_user_by_token, :only => [:destroy]
    after_action :reset_session, :only => [:destroy]

    #NOTE: since the authentiation is now moving to standard devise
    #      and Ominiauth, devise_token_auth needs to be updated to handle the
    #      log_out
    #
    #      render_destroy_error and render_destroy_success is commented out
    #      because otherwise, it would print the result to the screen after log_out
    def destroy
      # remove auth instance variables so that after_action does not run
      user = remove_instance_variable(:@resource) if @resource
      client_id = remove_instance_variable(:@client_id) if @client_id
      remove_instance_variable(:@token) if @token

      if user && client_id && user.tokens[client_id]
        user.tokens.delete(client_id)
        user.save!

        yield user if block_given?

        # render_destroy_success
      else
        # render_destroy_error
      end
      redirect_to root_url
    end
  end
end
