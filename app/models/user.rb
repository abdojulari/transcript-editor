class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable,
          # :recoverable, :confirmable, :registerable,
          :rememberable, :trackable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  belongs_to :user_role

  def incrementLinesEdited(amount=1)
    update_attributes(lines_edited: lines_edited + amount)
  end

  def recalculate(edits=nil)
    edits ||= TranscriptEdit.getByUser(id)
    if edits
      update_attributes(lines_edited: edits.length)
    end
  end

  def setRole(role_name)
    user_role = UserRole.find_by name: role_name
    if user_role && user_role.id != user_role_id
      update_attributes(user_role_id: user_role.id)
    end
  end

  def isAdmin?
    role = user_role
    role && role.name == "admin"
  end

  def self.getAll
    Rails.cache.fetch("#{ENV['PROJECT_ID']}/users/all", expires_in: 10.minutes) do
      User.all
    end
  end

  def self.getStatsByDay
    Rails.cache.fetch("#{ENV['PROJECT_ID']}/users/stats", expires_in: 10.minutes) do
      User
        .select('DATE(created_at) AS date, COUNT(*) AS count')
        .group('DATE(created_at)')
        .order('DATE(created_at)')
    end
  end

end
