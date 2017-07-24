require 'fileutils'
include CarrierWave::MiniMagick

namespace :s3 do
  # Usage:
  #     rake s3:file_conversion
  desc "convert manually uploaded files to carrierwave objects"
  task file_conversion: :environment do |task, args|
    records = []

    [Collection, Transcript].each do |klass|
      klass.where.not(image_url: nil).find_each do |resource|
        image_url = resource.read_attribute(:image_url)

        if image_url.present? && resource.image.blank?
            records << resource

            dir_name = FileUtils.mkpath('tmp/s3_uploads/')
            file_name = File.basename(image_url)
            file_path = File.join(dir_name, file_name)

            # Download the image from S3 and store in temp folder.
            File.open(file_path, 'wb') do |file|
              file.write open(image_url).read
            end

            # Upload the image from disk.
            resource.vendor = Vendor.find_by uid: "voice_base"
            resource.image = Rails.root.join('tmp', 's3_uploads', file_name).open
            resource.save

            print "."
        end
      end

      puts "Updated #{records.count} records"
    end
  end
end
