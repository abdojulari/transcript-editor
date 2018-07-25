# rubocop:disable FactoryBot/StaticAttributeDefinedDynamically
FactoryBot.define do
  factory :vendor do
    uid { Faker::Lorem.characters(10) }
    name { "VoiceBase" }
  end
end
# rubocop:enable FactoryBot/StaticAttributeDefinedDynamically
