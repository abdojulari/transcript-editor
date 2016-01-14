class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable,
          # :recoverable, :confirmable, :registerable, 
          :rememberable, :trackable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User
end
