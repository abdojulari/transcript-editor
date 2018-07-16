FactoryBot.define do
  factory :transcription_convention do
    convention_key { Faker::Lorem.characters(10) }
    convention_text { Faker::Lorem.characters(10) }
    example { Faker::Lorem.characters(10) }
    institution
  end
end
