namespace :transcript_lines do

  # Usage:
  #     rake transcript_lines:recalculate[0,'adrian-wagner-nxr3fk']
  #     rake transcript_lines:recalculate[56]
  #     rake transcript_lines:recalculate
  desc "Recalculate a line, a transcript's lines, or all lines"
  task :recalculate, [:line_id, :transcript_uid] => :environment do |task, args|
    args.with_defaults line_id: 0
    args.with_defaults transcript_uid: false

    lines = []
    line_id = args[:line_id].to_i

    if line_id > 0
      lines = TranscriptLine.where(id: line_id)

    elsif !args[:transcript_uid].blank?
      transcript = Transcript.find_by(uid: args[:transcript_uid])
      lines = TranscriptLine.getEditedByTranscriptId(transcript.id)

    else
      lines = TranscriptLine.getEdited
    end

    lines.each do |line|
      line.recalculate
    end

  end

end
