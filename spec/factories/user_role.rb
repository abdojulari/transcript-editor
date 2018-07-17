FactoryBot.define do
  factory :user_role do
    name { 'user' }
    hiearchy { 10 }
    description { 'Registered user' }

    trait :admin do
      name { 'admin' }
      hiearchy { 100 }
      description { 'Administrator has all privileges' }
    end

    trait :moderator do
      name { 'moderator' }
      hiearchy { 50 }
      description { 'Moderator can review edits' }
    end

    trait :content_editor do
      name { 'content_editor' }
      hiearchy { 50 }
      description { 'content_editor' }
    end
  end
end
