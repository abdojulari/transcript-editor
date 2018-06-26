class InstitutionPolicy < ApplicationPolicy
  attr_reader :user, :institution

  def initialize(user, institution)
    @user = user
    @institution = institution
  end

  class Scope < Scope
    def resolve
      if @user.isAdmin?
        Institution.all
      end
    end
  end
end
