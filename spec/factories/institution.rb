FactoryBot.define do
  factory :institution do
    name { Faker::University.name }
    url { 'http://google.com' }
    slug { Faker::Lorem.characters(10) }
  end
end
