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

end
