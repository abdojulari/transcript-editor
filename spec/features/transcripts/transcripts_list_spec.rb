require 'rails_helper'

RSpec.feature 'Transcripts List' do
  describe 'transcripts list page', js: true do
    let!(:my_page) { create(:page, page_type: 'instructions') }
    let!(:public_page) { create(:public_page, page: my_page) }

    context 'with transcripts on page' do
      let!(:institution) { create(:institution) }
      let!(:collection) { create(:collection, institution: institution, publish: true) }
      let!(:transcript) { create(:transcript, collection: collection, publish: true, lines: 1) }
      let!(:transcript_line) { create(:transcript_line, transcript: transcript) }

      it 'shows the transcripts list' do
        visit root_path
        expect(page).to have_text(transcript.title)
      end
    end

    context 'when there are no transcripts' do
      it 'shows a message saying there are no transcripts' do
        visit root_path
        expect(page).to have_text('No transcripts found, please make another selection.')
      end
    end
  end
end
