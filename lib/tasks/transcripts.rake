require 'csv'
require 'fileutils'
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
    puts "Retrieved #{transcripts.length} from file"

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

  task :upload => :environment do |task, args|

    # Retrieve transcripts from database

    # Retrieve transcripts from Popup Archive

    # Look for any transcripts in database that is not in Popup Archive; upload
  end

  task :download => :environment do |task, args|

    # Retrieve transcripts from database

    # Retrieve transcripts from Popup Archive

    # Look for any new transcripts not in database; update
  end

  def get_transcripts_from_file(file_path)
    transcripts = []

    csv_body = File.read(file_path)
    csv = CSV.new(csv_body, :headers => true, :header_converters => :symbol, :converters => [:all])
    transcripts = csv.to_a.map {|row| row.to_hash }

    transcripts
  end

end
