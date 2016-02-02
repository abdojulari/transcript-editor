require 'fileutils'
require 'json'
require 'popuparchive'

namespace :pua do

  # Usage: rake pua:upload
  desc "Upload the unprocessed audio to Pop Up Archive"
  task :upload, [:project_key] => :environment do |task, args|

    # Retrieve transcripts that have Pop Up Archive as its vendor and are empty
    transcripts = Transcript.getForUploadByVendor('pop_up_archive')
    puts "Retrieved #{transcripts.length} transcripts from collections with Pop Up Archive as its vendor that are empty"

    # Init a Pop Up Archive client
    pua_client = Pua.new

    transcripts.find_each do |transcript|
      item = pua_client.createItem(transcript)
    end

  end

  # Usage: rake pua:download['oral-history']
  desc "Download new transcripts from Pop Up Archive"
  task :download, [:project_key] => :environment do |task, args|

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
        transcript.loadFromHash(contents)
      end

    end

  end

  # Usage: rake pua:update['oral-history']
  desc "Update metadata from Pop Up Archive"
  task :update, [:project_key] => :environment do |task, args|
    # Retrieve transcripts that have Pop Up Archive as its vendor and are empty
    transcripts = Transcript.getForUpdateByVendor('pop_up_archive')
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

end
