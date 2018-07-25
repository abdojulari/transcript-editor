class TranscriptPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def destroy?
    @user.admin?
  end
end
