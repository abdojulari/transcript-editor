namespace :test do

  # Usage:
  #     rake test:seed
  desc "Seed a transcript for testing various stages of transcripts"
  task :seed, [:edits]  => :environment do |task, args|
    do_edits = (args[:edits] || false)

    # seed users

    # seed transcript
    transcript = seedTranscript

    # seed lines
    seedLines(transcript)

    if do_edits
      seedEdits(transcript)
    end

  end

  def seedEdits(transcript)
    # Remove existing edits
    TranscriptEdit.where(:transcript => transcript.id).destroy_all

    # seed edits: editing
    # seed edits: reviewing
    # seed edits: completed
    # seed edits: editing
    # seed edits: flagged
  end

  def seedLine(attributes)
    line = TranscriptLine.find_or_initialize_by({transcript_id: attributes[:transcript_id], sequence: attributes[:sequence]})
    line.update(attributes)
    line
  end

  def seedLines(transcript)
    puts "Seeding transcript lines..."

    lines = []
    lines << seedLine({transcript_id: transcript.id, sequence: 0, start_time: 100, end_time: 5000, original_text: 'Picture yerself in a goat on a hiver', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 1, start_time: 5100, end_time: 11500, original_text: 'With tanjereen treez and marmalade skyz', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 2, start_time: 11600, end_time: 17000, original_text: 'Somebody callz u, u answer kwite slowly', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 3, start_time: 17100, end_time: 22000, original_text: 'A gurl with kaleidoscope eyez', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 4, start_time: 22100, end_time: 27000, original_text: 'Sellophane flowerz of yellow and green', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 5, start_time: 27100, end_time: 32000, original_text: 'Towering over ure hed', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 6, start_time: 32100, end_time: 37000, original_text: 'Look fer the gurl with the son in her eyez', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 7, start_time: 37100, end_time: 42000, original_text: 'And she\'s gawn', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 8, start_time: 42100, end_time: 47000, original_text: 'Loosie in the skie wit diamondz', guess_text: '', text: '', transcript_line_status_id: 1})
    lines << seedLine({transcript_id: transcript.id, sequence: 9, start_time: 47100, end_time: 52000, original_text: 'Loosie in the skie wit diamondz', guess_text: '', text: '', transcript_line_status_id: 1})
    lines
  end

  def seedTranscript
    puts "Seeding transcript..."

    attributes = {uid: 'lucy-in-the-sky-with-diamonds', title: 'Lucy in the Sky with Diamonds', audio_url: '/audio/lucy_sample.mp3', lines: 10, duration: 52, transcript_status_id: 1}
    transcript = Transcript.find_or_initialize_by(uid: attributes[:uid])
    transcript.update(attributes)
    transcript
  end

end
