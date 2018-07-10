FactoryBot.define do
  factory :collection do
    uid { 'faith_bandler' }
    title { 'Faith Bandler' }
    description { 'Faith Bandler interviewed by Carol' }
    url { 'http://archival.sl.nsw.gov.au/Details/archive' }
    image_url { 'https://slnsw-amplify.s3.amazonaws.com/image.jpg' }
    project_uid { 'nsw-state-library-amplify' }
    vendor_identifier { 1 }
    institution
    vendor
  end
end
