# frozen_string_literal: true

RSpec.describe User, type: :model do
  # associations
  it { is_expected.to belong_to(:institution) }
end
