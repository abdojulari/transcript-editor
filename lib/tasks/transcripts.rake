require 'csv'
require 'fileutils'
require 'json'
require 'securerandom'

namespace :transcripts do

  # Usage rake transcripts:load['oral-history','transcripts_seeds.csv']
  desc "Load transcripts by project key and csv file"
  task :load, [:project_key, :filename] => :environment do |task, args|

    # Validate project
    project_path = Rails.root.join('project', args[:project_key])
    if !File.directory?(project_path)
      puts "No project directory found for: #{args[:project_key]}"
      exit
    end

    # Validate file
    file_path = Rails.root.join('project', args[:project_key], 'data', args[:filename])
    if !File.exist? file_path
      puts "No transcript file found: #{file_path}"
      exit
    end

    # Get transcripts to upload
    transcripts = get_transcripts_from_file(file_path)
    puts "Retrieved #{transcripts.length} rows from file"

    # Write to database
    transcripts.each do |attributes|
      # Check for vendor
      if attributes.key?(:vendor) && attributes.key?(:vendor_identifier)
        attributes[:vendor] = Vendor.find_by_uid(attributes[:vendor])
      end
      if attributes[:vendor].blank?
        attributes.delete(:vendor)
      end
      # Check for collection
      if attributes.key?(:collection)
        attributes[:collection] = Collection.find_by_uid(attributes[:collection])
      end
      if attributes[:collection].blank?
        attributes.delete(:collection)
      end
      # Make the filename the batch id
      attributes[:batch_id] = args[:filename]
      attributes[:project_uid] = args[:project_key]
      # puts attributes
      transcript = Transcript.find_or_initialize_by(uid: attributes[:uid])
      transcript.update(attributes)
    end

    puts "Wrote #{transcripts.length} transcripts to database"
  end

  def get_transcripts_from_file(file_path)
    csv_body = File.read(file_path)
    csv = CSV.new(csv_body, :headers => true, :header_converters => :symbol, :converters => [:all])
    csv.to_a.map {|row| row.to_hash }
  end

end
