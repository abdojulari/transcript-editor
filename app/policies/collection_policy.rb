class CollectionPolicy < ApplicationPolicy
  attr_reader :user, :collection

  def initialize(user, collection)
    @user = user
    @collection = collection
  end

  def index?
    admin_or_content_editor?
  end

  def show?
    admin_or_content_editor?
  end

  def update?
    admin_or_content_editor?
  end

  def destroy?
    @user.admin?
  end

  class Scope < Scope
    def resolve
      # remove the default scope
      collection = Collection.unscoped
      if @user.admin?
        collection.all
      else
        collection.where(institution_id: @user.institution_id)
      end
    end
  end
end
