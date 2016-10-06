class UserRole < ActiveRecord::Base

  def self.getAll
    UserRole.order(:hiearchy)
  end

end
