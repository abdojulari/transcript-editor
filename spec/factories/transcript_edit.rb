FactoryBot.define do
  factory :transcript_edit do
    transcript
    transcript_line
    user
    text { Faker::Lorem.sentence }
    session_id { Faker::Crypto.md5 }
  end
end
