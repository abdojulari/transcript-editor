FactoryBot.define do
  factory :user do
    provider { 'google_oauth2' }
    uid { '12345678' }
    name { Faker::Name.name }
    nickname { Faker::Name.initials }
    email { Faker::Internet.email }
    lines_edited { 0 }
    association :user_role, factory: :user_role

    trait :admin do
      association :user_role, factory: [:user_role, :admin]
    end

    trait :moderator do
      association :user_role, factory: [:user_role, :moderator]
    end
  end
end
