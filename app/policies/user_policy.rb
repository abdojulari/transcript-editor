class UserPolicy < ApplicationPolicy
  attr_reader :user, :scope

  def initialize(user, scope)
    @user = user
    @scope = scope
  end

  def index?
    admin_or_content_editor?
  end

  def update?
    admin_or_content_editor?
  end

  class Scope < Scope
    def resolve
      if @user.admin?
        User.all
      else
        User.where("institution_id = ?", @user.institution_id)
      end
    end
  end
end
