json.entries @users do |user|
  json.extract! user, :name, :image, :email, :user_role_id, :lines_edited
end
