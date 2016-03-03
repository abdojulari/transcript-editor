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
      if attributes[:vendor_identifier].blank?
        attributes.delete(:vendor_identifier)
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

  # Usage:
  #     rake transcripts:recalculate['adrian-wagner-nxr3fk']
  #     rake transcripts:recalculate
  desc "Recalculate a transcript, or all transcript"
  task :recalculate, [:transcript_uid] => :environment do |task, args|
    args.with_defaults transcript_uid: false

    transcripts = []

    if !args[:transcript_uid].blank?
      transcripts = Transcript.where(uid: args[:transcript_uid])

    else
      transcripts = Transcript.getEdited
    end

    transcripts.each do |transcript|
      transcript.recalculate
    end

  end

  # Usage rake transcripts:update_file['oral-history','transcripts_seeds.csv']
  desc "Update a csv file based on data in database"
  task :update_file, [:project_key, :filename] => :environment do |task, args|

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

    # Get collections from file
    transcripts_from_file = get_transcripts_from_file(file_path)
    transcripts_from_file.each_with_index do |attributes, i|
      transcript = Transcript.find_by uid: attributes[:uid]

      # If collection found in DB, update appropriate fields
      if transcript
        transcripts_from_file[i][:vendor_identifier] = transcript[:vendor_identifier]
      end
    end

    # Update the file
    update_transcripts_to_file(file_path, transcripts_from_file)
    puts "Updated #{transcripts_from_file.length} transcripts in file"
  end

  def get_transcripts_from_file(file_path)
    csv_body = File.read(file_path)
    csv = CSV.new(csv_body, :headers => true, :header_converters => :symbol, :converters => [:all])
    csv.to_a.map {|row| row.to_hash }
  end

  def update_transcripts_to_file(file_path, transcripts)
    CSV.open(file_path, "wb") do |csv|
      csv << transcripts.first.keys # adds the attributes name on the first line
      transcripts.each do |hash|
        csv << hash.values
      end
    end
  end

end
