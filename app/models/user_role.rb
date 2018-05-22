class UserRole < ApplicationRecord

  def self.getAll
    UserRole.order(:hiearchy)
  end

end
