require 'fileutils'
include CarrierWave::MiniMagick

namespace :s3 do
  # Usage:
  #     rake s3:file_conversion
  desc "convert manually uploaded files to carrierwave objects"
  task file_conversion: :environment do |task, args|
    success = []
    errors = []
    voice_base = Vendor.find_by uid: "voice_base"

    [Collection, Transcript].each do |klass|
      klass.where.not(image_url: nil).find_each do |resource|
        image_url = resource.read_attribute(:image_url)

        if image_url.present? && resource.image.blank?
            dir_name = FileUtils.mkpath('tmp/s3_uploads/')
            file_name = File.basename(image_url)
            file_path = File.join(dir_name, file_name)

            # Download the image from S3 and store in temp folder.
            File.open(file_path, 'wb') do |file|
              file.write open(image_url).read
            end

            # Upload the image from disk.
            resource.vendor = voice_base
            resource.image = Rails.root.join('tmp', 's3_uploads', file_name).open

            if resource.save
              success << resource
            else
              errors << resource
            end
        end
      end

      if success.empty? && errors.empty?
        puts "No records needed to be updated"
      else
        puts "Updated #{success.count} records"
        puts "Failed to update the #{errors.count} records"
        errors.each { |el| puts "* #{el.class} - #{el.uid}" }
      end
    end
  end
end
