RSpec.describe Institution, type: :model do

  # associations
  it { should have_many(:collections)  }

  # validations
  it { should validate_presence_of(:name)  }
  it { should validate_uniqueness_of(:name)  }
  it { should allow_value("correct-value").for(:slug)  }
  it { should_not allow_value("value with space").for(:slug)  }

end
