require 'rails_helper'

RSpec.feature 'Transcript Page', sidekiq: true do
  let(:admin) { create(:user, :admin) }
  let!(:collection) { create(:collection) }
  let(:status) { double("command execution status", :success? => true) }

  describe 'upload an audio file as an admin', js: true do
    before { sign_in admin }

    it 'shows the summary page' do
      stub_audio_file_convert
      stub_azure_speech_to_text status: status

      visit admin_cms_path
      first('.fa-list').click
      click_on 'Create Item'
      fill_in 'Uid', with: 'test-transcript'
      fill_in 'Title', with: 'test transcript title'
      choose 'Upload with Azure'
      attach_file 'Audio file', file_fixture('speech_to_text/aboutSpeechSdk.mp3').realpath
      click_on 'Save Item'

      expect(page).to have_content "The new transcript has been saved."
      transcript = Transcript.last
      expect(transcript.process_status).to eq 'completed'
      expect(transcript.transcript_lines.count).to eq 5
      expect(transcript.transcript_lines.first.text).to eq "the speech SDK exposes many features from the speech service but not all of them"
    end
  end
end
