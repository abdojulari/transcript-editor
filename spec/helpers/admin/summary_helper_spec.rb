require 'rails_helper'

RSpec.describe Admin::SummarydHelper, type: :helper do
  describe '.prettify_duration' do
    it 'returns a humanized duration string from an integer' do
      expect(helper.prettify_duration(2000)).to eq('00h 33m 20s')
    end
  end
end
