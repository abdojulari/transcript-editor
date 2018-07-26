FactoryBot.define do
  factory :speaker do
    name { Faker::Lorem.characters(10) }
  end
end
