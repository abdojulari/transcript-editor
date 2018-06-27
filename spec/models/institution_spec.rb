require 'rails_helper'

RSpec.describe Institution, type: :model do

  # associations
  it { should have_many(:collections)  }

  # validations
  it { should validate_presence_of(:name)  }
  it { should validate_uniqueness_of(:name)  }
end
