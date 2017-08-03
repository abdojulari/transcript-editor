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
  # Google OAuth2 authentication.
  if ENV.key?('GOOGLE_CLIENT_ID') && ENV.key?('GOOGLE_CLIENT_SECRET')
    provider :google_oauth2,
             ENV['GOOGLE_CLIENT_ID'],
             ENV['GOOGLE_CLIENT_SECRET'],
             skip_jwt: true
  end

  # Facebook authentication.
  if ENV.key?('FACEBOOK_APP_ID') && ENV.key?('FACEBOOK_APP_SECRET')
    provider :facebook,
             ENV['FACEBOOK_APP_ID'],
             ENV['FACEBOOK_APP_SECRET']
  end

  # Azure AD OpenID Connect authentication.
  if ENV.key?('AZUREAD_AAD_CLIENT_ID') && ENV.key?('AZUREAD_AAD_TENANT')
    provider :azure_activedirectory,
             ENV['AZUREAD_AAD_CLIENT_ID'],
             ENV['AZUREAD_AAD_TENANT']
  end

  # SAML authentication.
  if ENV.key?('SAML_CONSUMER_SERVICE_URL')
    # Load certificate and generate fingerprint.
    cert_data = nil
    cert_data = ENV['SAML_IDP_CERT'] if ENV.key?('SAML_IDP_CERT')
    cert_data = File.read(Rails.root.join(ENV['SAML_IDP_CERT_PATH'])) if
      ENV.key?('SAML_IDP_CERT_PATH') &&
      File.exist?(Rails.root.join(ENV['SAML_IDP_CERT_PATH']))
    certificate = OpenSSL::X509::Certificate.new(cert_data)
    fingerprint = certificate.to_s

    provider :saml,
      assertion_consumer_service_url: ENV['SAML_CONSUMER_SERVICE_URL'],
      issuer: ENV['SAML_ISSUER'],
      idp_sso_target_url: ENV['SAML_SSO_TARGET_URL'],
      idp_sso_target_url_runtime_params: { original_request_param: :mapped_idp_param },
      idp_cert: cert_data,
      idp_cert_fingerprint: fingerprint,
      idp_cert_fingerprint_validator: lambda { |fp| fp },
      name_identifier_format: ENV['SAML_NAME_ID_FORMAT']
  end
end
