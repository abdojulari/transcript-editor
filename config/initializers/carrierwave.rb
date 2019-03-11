CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     ENV['AWS_S3_ACCESS_KEY_ID'],
    aws_secret_access_key: ENV['AWS_S3_SECRET_ACCESS_KEY'],
    region:                ENV['AWS_S3_REGION']
  }

  config.fog_directory  = ENV['AWS_S3_BUCKET']
  config.fog_public     = true
  config.fog_attributes = { cache_control: "public, max-age=#{365.day.to_i}" }

  # NSW State Library Amplify uses the same S3 bucket for production
  # and staging environments
  if Rails.env.production? || Rails.env.staging?
    # Use AWS storage if in production or staging
    config.storage = :fog
  else
    # Use local storage if in development or test
    config.storage = ENV['CARRIERWAVE_STORAGE'].to_sym || :file
  end
end
