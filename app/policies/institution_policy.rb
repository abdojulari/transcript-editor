class InstitutionPolicy < ApplicationPolicy
  attr_reader :user, :institution

  def initialize(user, institution)
    @user = user
    @institution = institution
  end

end
