class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable,
          # :recoverable, :confirmable, :registerable,
          :rememberable, :trackable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  belongs_to :user_role

  def setRole(role_name)
    user_role = UserRole.find_by name: role_name
    if user_role && user_role.id != user_role_id
      update_attributes(user_role_id: user_role.id)
    end
  end
end
