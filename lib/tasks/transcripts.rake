require 'csv'
require 'fileutils'
require 'json'
require 'popuparchive'
require 'securerandom'

namespace :transcripts do

  # Usage rake transcripts:load['oral-history','transcripts_seeds.csv']
  desc "Load transcripts by project key and csv file"
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
      puts "No transcript file found: #{file_path}"
      exit
    end

    # Get transcripts to upload
    transcripts = get_transcripts_from_file(file_path)
    puts "Retrieved #{transcripts.length} rows from file"

    # Write to database
    transcripts.each do |transcript|
      # Check for vendor
      if transcript.key?(:vendor) && transcript.key?(:vendor_identifier)
        transcript[:vendor] = Vendor.find_by_uid(transcript[:vendor])
      else
        transcript[:vendor_id] = 0
        transcript[:vendor_identifier] = SecureRandom.hex
      end
      # Check for collection
      if transcript.key?(:collection)
        transcript[:collection] = Collection.find_by_uid(transcript[:collection])
      end
      Transcript.create(transcript)
    end

    puts "Wrote #{transcripts.length} transcripts to database"
  end

  # Usage: rake transcripts:upload_pua
  desc "Upload the unprocessed audio to Pop Up Archive"
  task :upload_pua, [:project_key] => :environment do |task, args|

    # Retrieve transcripts that have Pop Up Archive as its vendor and are empty
    transcripts = Transcript.getForUploadByVendor('pop_up_archive')
    puts "Retrieved #{transcripts.length} transcripts from collections with Pop Up Archive as its vendor that are empty"

    # Init a Pop Up Archive client
    pua_client = Pua.new

    transcripts.find_each do |transcript|
      item = pua_client.createItem(transcript)
    end

  end

  # Usage: rake transcripts:download_pua['oral-history']
  desc "Download new transcripts from Pop Up Archive"
  task :download_pua, [:project_key] => :environment do |task, args|

    # Retrieve transcripts that have Pop Up Archive as its vendor and are empty
    transcripts = Transcript.getForDownloadByVendor('pop_up_archive')
    puts "Retrieved #{transcripts.length} transcripts from collections with Pop Up Archive as its vendor that are empty"

    # Init a Pop Up Archive client
    pua_client = Pua.new

    transcripts.find_each do |transcript|

      # Check if transcript already exists in project directory
      transcript_file = Rails.root.join('project', args[:project_key], 'transcripts', 'pop_up_archive', "#{transcript[:vendor_identifier]}.json")
      contents = ""
      if File.exist? transcript_file
        puts "Found transcript in project folder: #{transcript_file}"
        file = File.read(transcript_file)
        contents = JSON.parse(file)

      # Otherwise retrieve it fresh from Pop Up Archive
      else
        contents = pua_client.getItem(transcript)
        puts "Retrieved #{contents["id"]} from Pop Up Archive"
      end

      # Parse the contents
      unless contents.empty?
        transcript.updateFromHash(contents)
      end

    end

  end

  def get_transcripts_from_file(file_path)
    csv_body = File.read(file_path)
    csv = CSV.new(csv_body, :headers => true, :header_converters => :symbol, :converters => [:all])
    csv.to_a.map {|row| row.to_hash }
  end

end
