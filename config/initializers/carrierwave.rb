require 'fog/aws'

CarrierWave.configure do |config|
  if Rails.env.production? || Rails.env.staging?
    # Use AWS storage if in production
    config.storage = :fog
  else
    # Use local storage if in development or test
    config.storage = :file
  end

  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     ENV['AWS_S3_ACCESS_KEY_ID'],
    aws_secret_access_key: ENV['AWS_S3_SECRET_ACCESS_KEY'],
    region:                ENV['AWS_S3_REGION']
  }
  config.fog_directory  = ENV['AWS_S3_BUCKET']
  config.fog_public     = true
  config.fog_attributes = { cache_control: "public, max-age=#{365.day.to_i}" }
end
