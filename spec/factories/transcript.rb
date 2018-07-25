# rubocop:disable FactoryBot/StaticAttributeDefinedDynamically
FactoryBot.define do
  factory :transcript do
    uid { Faker::Lorem.characters(10) }
    title { Faker::Lorem.sentence }
    description { "Faith Bandler interviewed by Carol" }
    audio_url { "http://google.com" }
    collection
    vendor
  end
end
# rubocop:enable FactoryBot/StaticAttributeDefinedDynamically
