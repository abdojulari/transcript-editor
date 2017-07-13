require "rails_helper"

RSpec.describe Collection, type: :model do
  describe "associations" do
    it { is_expected.to have_many :transcripts }
    it { is_expected.to belong_to :vendor }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of :vendor }
    it { is_expected.to validate_presence_of :description }
    it { is_expected.to validate_presence_of :uid }
    it { is_expected.to validate_presence_of :title }
    it { is_expected.to validate_presence_of :call_number }
    it { is_expected.to validate_presence_of :url }

    it { is_expected.to validate_uniqueness_of :uid }
    it { is_expected.to validate_uniqueness_of :title }
    it { is_expected.to validate_uniqueness_of :call_number }
    it { is_expected.to validate_uniqueness_of :url }
  end
end
