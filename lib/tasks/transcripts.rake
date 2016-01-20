require 'csv'
require 'fileutils'
require 'popuparchive'
require 'securerandom'

namespace :transcripts do

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
      unless transcript.key?(:vendor) && transcript.key?(:vendor_identifier)
        transcript[:vendor] = 'none'
        transcript[:vendor_identifier] = SecureRandom.hex
      end
      Transcript.create(transcript)
    end

    puts "Wrote #{transcripts.length} transcripts to database"
  end

  desc "Upload the unprocessed audio to Pop Up Archive"
  task :upload_pua => :environment do |task, args|

    # Retrieve transcripts that have Pop Up Archive as its vendor
    transcripts = get_transcripts_by_vendor('pop_up_archive')
    puts "Retrieved #{transcripts.length} transcripts from collections with Pop Up Archive as its vendor"

    # Retrieve transcripts from Popup Archive
    pua_transcripts = get_transcripts_from_pua()

    # Look for any transcripts in database that is not in Popup Archive; upload
  end

  desc "Download new transcripts from Pop Up Archive"
  task :download_pua => :environment do |task, args|

    # Retrieve transcripts from database
    transcripts = get_transcripts_by_vendor('pop_up_archive')
    puts "Retrieved #{transcripts.length} transcripts from collections with Pop Up Archive as its vendor"

    # Retrieve transcripts from Popup Archive
    pua_transcripts = get_transcripts_from_pua()

    # Look for any new transcripts not in database; update
  end

  def get_transcripts_by_vendor(vendor)
    Transcript.joins('INNER JOIN collections ON transcripts.collection = collections.uid').where(:collections => {:vendor => vendor})
  end

  def get_transcripts_from_file(file_path)
    csv_body = File.read(file_path)
    csv = CSV.new(csv_body, :headers => true, :header_converters => :symbol, :converters => [:all])
    csv.to_a.map {|row| row.to_hash }
  end

  def get_transcripts_from_pua()
    []
  end

end
