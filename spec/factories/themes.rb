FactoryBot.define do
  factory :theme do
    name { Faker::Lorem.characters(10) }
  end
end
