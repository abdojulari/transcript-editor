class UserRole < ApplicationRecord

  # any user role that is >= 3 consider as staff
  # any user role that is <= 3 consider as public users (guest and registred)
  MIN_STAFF_LEVEL = 3

  def self.getAll
    UserRole.order(:hiearchy)
  end

end
