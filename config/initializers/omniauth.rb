# frozen_string_literal: true

module OmniAuth
  module Strategies
    # Monkey-patch for Omniauth Azure AD.
    # @see https://github.com/AzureAD/omniauth-azure-activedirectory/issues/25
    class AzureActiveDirectory
      def raw_authorize_endpoint_url
        hostname = 'login.windows.net'
        if ENV.key?('AZUREAD_ENDPOINT_HOSTNAME')
          hostname = ENV['AZUREAD_ENDPOINT_HOSTNAME']
        end
        'https://' + hostname + '/common/oauth2/authorize'
      end

      def authorize_endpoint_url
        uri = URI(raw_authorize_endpoint_url)
        uri.query = URI.encode_www_form(client_id: client_id,
                                        redirect_uri: callback_url,
                                        response_mode: response_mode,
                                        response_type: response_type,
                                        nonce: new_nonce)
        uri.to_s
      end

      def verify_options
        { verify_expiration: true,
          verify_not_before: true,
          verify_iat: true,
          verify_aud: true,
          'aud' => client_id }
      end
    end
  end
end

# Initialise Omniauth config.
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
           ENV['GOOGLE_CLIENT_ID'],
           ENV['GOOGLE_CLIENT_SECRET'],
           skip_jwt: true
  provider :facebook,
           ENV['FACEBOOK_APP_ID'],
           ENV['FACEBOOK_APP_SECRET']
  provider :azure_activedirectory,
           ENV['AZUREAD_AAD_CLIENT_ID'],
           ENV['AZUREAD_AAD_TENANT']
end
