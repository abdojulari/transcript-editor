# This set of tests ensures consensus works as expected on the data model level. This does not test the views or controllers.
# Usage:
#   Run all the tests: rake test test/models/transcript_edit_test.rb
#   Run one test: rake test test/models/transcript_edit_test.rb test_consensus_one

require 'test_helper'

class TranscriptEditTest < ActiveSupport::TestCase

  # called before every single test
  def setup
    # Seed/update the database with test data
    seedProject
    seedTranscript
    seedUsers

    # Retrieve transcript line statuses
    @status_editing = TranscriptLineStatus.find_by name: 'editing'
    @status_reviewing = TranscriptLineStatus.find_by name: 'reviewing'
    @status_completed = TranscriptLineStatus.find_by name: 'completed'
  end

  # called after every single test
  def teardown
  end

  def seedProject
    puts "Seeding project..."
    attributes = {uid: 'test_project', active: false, data: {
      name: 'Test Project',
      description: 'Project used for testing scripts found in ./test',
      consensus: {
        maxLineEdits: 5,
        minLinesForConsensus: 3,
        minPercentConsensus: 0.34,
        minUserHiearchyOverride: 50
      }
    }}
    @project = Project.find_or_initialize_by(uid: attributes[:uid])
    @project.update(attributes)
  end

  def seedTranscript
    puts "Seeding transcript..."
    attributes = {uid: 'lucy', title: 'Lucy in the Sky with Diamonds', lines: 9}
    @transcript = Transcript.find_or_initialize_by(uid: attributes[:uid])
    @transcript.update(attributes)
  end

  def seedUsers
    puts "Seeding users..."

    # registered user
    user_role = UserRole.find_by name: 'user'
    @registered_user = User.new(:email => 'registered_user_1@test.com', :password => 'password', :password_confirmation => 'password', user_role_id: user_role.id)
    @registered_user.save

    # admin user
    admin_role = UserRole.find_by name: 'admin'
    @admin_user = User.new(:email => 'admin_user_1@test.com', :password => 'password', :password_confirmation => 'password', user_role_id: admin_role.id)
    @admin_user.save
  end

  def seedLine(attributes)
    line = TranscriptLine.find_or_initialize_by({transcript_id: attributes[:transcript_id], sequence: attributes[:sequence]})
    line.update(attributes)
    line
  end

  def seedEdits(edits)
    edits.each do |attributes|
      edit = TranscriptEdit.find_or_initialize_by({transcript_line_id: attributes[:transcript_line_id], session_id: attributes[:session_id]})
      edit.update(attributes)
    end
  end

  # Consensus: three edits, all agree
  test "consensus one" do
    line = seedLine({transcript_id: @transcript.id, sequence: 1, original_text: 'Picture yerself in a goat on a hiver', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'one_1', text: 'Picture yourself in a boat on a river'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'one_2', text: 'Picture yourself in a boat on a river'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'one_3', text: 'Picture yourself in a boat on a river'}
    ])
    line.recalculate(nil, @project)
    correct_text = "Picture yourself in a boat on a river"

    assert line.text == correct_text, "Correct text chosen"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_completed.id, "Correct status: completed"
  end

  # Consensus: four edits, one is original text, two agree; choose the one with two
  test "consensus two" do
    line = seedLine({transcript_id: @transcript.id, sequence: 2, original_text: 'With tanjereen treez and marmalade skyz', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'two_1', text: 'With tangerine trees and marmalade skies'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'two_2', text: 'With tangerine trees and marmalade skies'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'two_3', text: 'With tanjereen treez and marmalade skyz'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'two_4', text: 'With tanjereen trees and marmalade skies'}
    ])
    line.recalculate(nil, @project)
    correct_text = "With tangerine trees and marmalade skies"

    assert line.text == correct_text, "Correct text chosen"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_completed.id, "Correct status: completed"
  end

  # Consensus: three edits, all agree (with normalized text); choose the one with registered user
  test "consensus three" do
    line = seedLine({transcript_id: @transcript.id, sequence: 3, original_text: 'Somebody callz u, u answer kwite slowly', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'three_1', text: 'Somebody calls you, you answer quite slowly', user_id: @registered_user.id},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'three_2', text: 'somebody calls you you answer quite slowly'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'three_3', text: 'Somebody calls YOU; you answer quite slowly.'}
    ])
    line.recalculate(nil, @project)
    correct_text = "Somebody calls you, you answer quite slowly"

    assert line.text == correct_text, "Correct text chosen"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_completed.id, "Correct status: completed"
  end

  # Consensus: three edits, all agree (with normalized text); choose the one with capitalization
  test "consensus four" do
    line = seedLine({transcript_id: @transcript.id, sequence: 4, original_text: 'A gurl with kaleidoscope eyez', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'four_1', text: 'A girl with kaleidoscope eyes'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'four_2', text: 'a girl with kaleidoscope eyes'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'four_3', text: 'a girl with kaleidoscope eyes'}
    ])
    line.recalculate(nil, @project)
    correct_text = "A girl with kaleidoscope eyes"

    assert line.text == correct_text, "Correct text chosen"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_completed.id, "Correct status: completed"
  end

  # Consensus: three edits, two agree (with normalized text); choose the one with punctuation
  test "consensus five" do
    line = seedLine({transcript_id: @transcript.id, sequence: 5, original_text: 'Sellophane flowerz of yellow and green', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'five_1', text: 'Cellophane flowers, of yellow and green'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'five_2', text: 'Cellophane flowers of yellow and green'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'five_3', text: 'Cellophane flowerz of yellow and green'}
    ])
    line.recalculate(nil, @project)
    correct_text = "Cellophane flowers, of yellow and green"

    assert line.text == correct_text, "Correct text chosen"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_completed.id, "Correct status: completed"
  end

  # Guess: three edits, nobody agrees; choose the one with a registered user
  test "guess one" do
    line = seedLine({transcript_id: @transcript.id, sequence: 6, original_text: 'Towering over ure hed', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'six_1', text: 'Towering over your head', user_id: @registered_user.id},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'six_2', text: 'Towering over ure head'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'six_3', text: 'Towering over your hed'}
    ])
    line.recalculate(nil, @project)
    correct_text = "Towering over your head"

    assert line.text.blank?, "Text is not yet final"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_editing.id, "Correct status: editing"
  end

  # Guess: three edits, nobody agrees; choose the one with punctuation
  test "guess two" do
    line = seedLine({transcript_id: @transcript.id, sequence: 7, original_text: 'Look fer the gurl with the son in her eyez', guess_text: '', text: '', transcript_line_status_id: 1})

    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'seven_1', text: 'Look for the girl with the sun in her eyes.'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'seven_2', text: 'Look fer the girl with the son in her eyez'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'seven_3', text: 'Look fer the gurl with the sun in her eyes'}
    ])
    line.recalculate(nil, @project)
    correct_text = "Look for the girl with the sun in her eyes."

    assert line.text.blank?, "Text is not yet final"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_editing.id, "Correct status: editing"
  end

  # Guess: three edits, nobody agrees; choose the one with numbers
  test "guess three" do
    line = seedLine({transcript_id: @transcript.id, sequence: 8, original_text: 'And she\'s gawn', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'eight_1', text: 'And shes 4 gone'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'eight_2', text: 'And shes gun'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'eight_3', text: 'And she is gawn'}
    ])
    line.recalculate(nil, @project)
    correct_text = "And shes 4 gone"

    assert line.text.blank?, "Text is not yet final"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_editing.id, "Correct status: editing"
  end

  # Review: five edits, nobody agrees; make into "review" status
  test "review one" do
    line = seedLine({transcript_id: @transcript.id, sequence: 9, original_text: 'Loosie in the skie wit diamondz', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'nine_1', text: 'Loosie in the sky wit diamondz'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'nine_2', text: 'Loosie in the skie with diamondz'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'nine_3', text: 'Loosie in the skie wit diamonds'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'nine_4', text: 'Lucy in the skie wit diamondz'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'nine_5', text: 'Lucy in the sky with diamonds'}
    ])
    line.recalculate(nil, @project)

    assert line.text.blank?, "Text is not yet final"
    assert !line.guess_text.blank?, "A guess has been made"
    assert line.transcript_line_status_id == @status_reviewing.id, "Correct status: reviewing"
  end

  # Consensus: three edits, two agree, one is an admin; choose the one by an admin
  test "consensus six" do
    line = seedLine({transcript_id: @transcript.id, sequence: 10, original_text: 'Follow er down to a bridge bye a fountane', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'ten_1', text: 'Follow her down to a bridge by a fountain', user_id: @admin_user.id},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'ten_2', text: 'Follow her down to a bridge, bye a fountane'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'ten_3', text: 'Follow her down to a bridge, bye a fountane'}
    ])
    line.recalculate(nil, @project)
    correct_text = "Follow her down to a bridge by a fountain"

    assert line.text == correct_text, "Correct text chosen"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_completed.id, "Correct status: completed"
  end

  # Consensus: three edits, nobody agrees, one is an admin; choose the one by an admin
  test "consensus seven" do
    line = seedLine({transcript_id: @transcript.id, sequence: 11, original_text: 'wear rocking horse ppl eat marshmellow piez', guess_text: '', text: '', transcript_line_status_id: 1})
    seedEdits([
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'eleven_1', text: 'Where rocking horse people eat marshmallow pies', user_id: @admin_user.id},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'eleven_2', text: 'wear rocking horse pepole eat marshmellow pies?'},
      {transcript_id: @transcript.id, transcript_line_id: line.id, session_id: 'eleven_3', text: 'Where rocking horse ppl eat marshmellow piez'}
    ])
    line.recalculate(nil, @project)
    correct_text = "Where rocking horse people eat marshmallow pies"

    assert line.text == correct_text, "Correct text chosen"
    assert line.guess_text == correct_text, "Correct guess chosen"
    assert line.transcript_line_status_id == @status_completed.id, "Correct status: completed"
  end
end
