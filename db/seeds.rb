# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Seed User Roles
user_roles = UserRole.create([
  { name: 'guest',      hiearchy: 0,    description: 'Unregistered user' },
  { name: 'user ',      hiearchy: 10,   description: 'Registered user' },
  { name: 'moderator',  hiearchy: 50,   description: 'Moderator can review edits' },
  { name: 'admin',      hiearchy: 100,  description: 'Administrator has all privileges' },
])

# Seed Vendors

vendors = Vendor.create([
  { uid: 'pop_up_archive', name: 'Pop Up Archive', description: 'Pop Up Archive makes sound searchable using cutting edge speech-to-text technology', url: 'https://popuparchive.com/' }
])

# Seed Transcript Statuses
transcript_statuses = TranscriptStatus.create([
  { name: 'initialized',            progress: 0,    description: 'Transcript Initialized' },
  { name: 'audio_uploaded ',        progress: 10,   description: 'Audio Uploaded' },
  { name: 'transcript_processing',  progress: 20,   description: 'Transcript Processing' },
  { name: 'transcript_downloaded',  progress: 30,   description: 'Transcript Downloaded' },
  { name: 'transcript_editing',     progress: 40,   description: 'Transcript is being edited' },
  { name: 'transcript_reviewing',   progress: 50,   description: 'Transcript being reviewed by admin' },
  { name: 'transcript_complete',    progress: 100,  description: 'Transcript completed' },
  { name: 'transcript_problematic', progress: 150,  description: 'Transcript completed but is problematic in some way' },
  { name: 'transcript_archived',    progress: 200,  description: 'Transcript archived' }
])
