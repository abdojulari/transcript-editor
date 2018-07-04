FactoryBot.define do
  factory :institution do
    name { Faker::University.name }
    url 'http://google.com'
    slug 'wagga-wagga'
  end
end
