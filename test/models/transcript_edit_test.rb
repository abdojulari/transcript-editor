require 'test_helper'

class TranscriptEditTest < ActiveSupport::TestCase

  # called before every single test
  def setup
    # Retrieve test transcript
    @transcript = Transcript.find_by uid: 'lucy'

    # Retrieve transcript line statuses
    @status_editing = TranscriptLineStatus.find_by name: 'editing'
    @status_reviewing = TranscriptLineStatus.find_by name: 'reviewing'
    @status_completed = TranscriptLineStatus.find_by name: 'completed'
  end

  # called after every single test
  def teardown
  end

  test "Consensus: three edits, all agree" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 1).take
    line.recalculate
    correct_text = "Picture yourself in a boat on a river"
    assert line.text == correct_text && line.guess_text == correct_text && line.transcript_line_status_id == @status_completed.id
  end

  test "Consensus: four edits, one original two agree" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 2).take
    line.recalculate
    correct_text = "With tangerine trees and marmalade skies"
    assert line.text == correct_text && line.guess_text == correct_text && line.transcript_line_status_id == @status_completed.id
  end

  test "Consensus: three edits, all agree, normalized, registered user" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 3).take
    line.recalculate
    correct_text = "Somebody calls you, you answer quite slowly"
    assert line.text == correct_text && line.guess_text == correct_text && line.transcript_line_status_id == @status_completed.id
  end

  test "Consensus: three edits, all agree, normalized, capitalization" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 4).take
    line.recalculate
    correct_text = "A girl with kaleidoscope eyes"
    assert line.text == correct_text && line.guess_text == correct_text && line.transcript_line_status_id == @status_completed.id
  end

  test "Consensus: three edits, two agree, normalized, punctuation" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 5).take
    line.recalculate
    correct_text = "Cellophane flowers, of yellow and green"
    assert line.text == correct_text && line.guess_text == correct_text && line.transcript_line_status_id == @status_completed.id
  end

  test "Guess: three edits, disagrees, registered user" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 6).take
    line.recalculate
    correct_text = "Towering over your head"
    assert line.text.blank? && line.guess_text == correct_text && line.transcript_line_status_id == @status_editing.id
  end

  test "Guess: three edits, disagrees, punctuation" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 7).take
    line.recalculate
    correct_text = "Look for the girl with the sun in her eyes."
    assert line.text.blank? && line.guess_text == correct_text && line.transcript_line_status_id == @status_editing.id
  end

  test "Guess: three edits, disagrees, numbers" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 8).take
    line.recalculate
    correct_text = "And shes 4 gone"
    assert line.text.blank? && line.guess_text == correct_text && line.transcript_line_status_id == @status_editing.id
  end

  test "Review: five edits, disagrees" do
    line = TranscriptLine.where(transcript_id: @transcript.id, sequence: 9).take
    line.recalculate
    assert line.text.blank? && !line.guess_text.blank? && line.transcript_line_status_id == @status_reviewing.id
  end
end
