class CollectionPolicy < ApplicationPolicy
  attr_reader :user, :collection

  def initialize(user, collection)
    @user = user
    @collection = collection
  end

  def index?
    @user.isAdmin?
  end

  def show?
    @user.isAdmin?
  end

  def update?
    @user.isAdmin?
  end

  class Scope < Scope
    def resolve
      if @user.isAdmin?
        Collection.all
      end
    end
  end

end
