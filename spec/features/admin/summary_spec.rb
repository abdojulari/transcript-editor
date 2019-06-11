require 'rails_helper'

RSpec.feature 'Summary Page' do
  let(:admin) { create(:user, :admin) }

  describe 'as an admin', js: true do
    context 'can see the Summary page' do
      before do
        sign_in admin
        visit admin_summary_index_path
      end

      it 'shows the summary page' do
        expect(page).to have_text('Summary of Completion percentages')
        expect(page).to have_current_path(admin_summary_index_path)
      end
    end
  end
end
