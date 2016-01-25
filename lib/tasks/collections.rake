require 'csv'
require 'fileutils'

namespace :collections do

  # Usage rake transcripts:load['oral-history','collections_seeds.csv']
  desc "Load collections by project key and csv file"
  task :load, [:project_key, :filename] => :environment do |task, args|

    # Validate project
    project_path = Rails.root.join('project', args[:project_key], '/')
    if !File.directory?(project_path)
      puts "No project directory found for: #{args[:project_key]}"
      exit
    end

    # Validate file
    file_path = Rails.root.join('project', args[:project_key], 'data', args[:filename])
    if !File.exist? file_path
      puts "No collection file found: #{file_path}"
      exit
    end

    # Get collections to upload
    collections = get_collections_from_file(file_path)
    puts "Retrieved #{collections.length} from file"

    # Write to database
    collections.each do |collection|
      collection[:vendor] = Vendor.find_by_uid(collection[:vendor])
      # puts collection
      Collection.create(collection)
    end


    puts "Wrote #{collections.length} collections to database"
  end

  def get_collections_from_file(file_path)
    collections = []

    csv_body = File.read(file_path)
    csv = CSV.new(csv_body, :headers => true, :header_converters => :symbol, :converters => [:all])
    collections = csv.to_a.map {|row| row.to_hash }

    collections
  end

end
