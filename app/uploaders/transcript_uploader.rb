class TranscriptUploader < CarrierWave::Uploader::Base
  include S3Identifier

  # Override the directory where uploaded files will be stored.
  # This path will be appended to the S3 bucket url.
  def store_dir
    "collections/#{s3_collection_uid}/transcripts/"
  end
end
