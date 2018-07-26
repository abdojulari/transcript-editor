FactoryBot.define do
  factory :collection do
    uid { Faker::Lorem.characters(10) }
    title { Faker::Lorem.sentence }
    description "Faith Bandler interviewed by Carol"
    url { Faker::Internet.url }
    image_url "https://slnsw-amplify.s3.amazonaws.com/image.jpg"
    project_uid "nsw-state-library-amplify"
    vendor_identifier 1
    institution
    vendor
  end
end
