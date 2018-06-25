class UserPolicy
  attr_reader :user

  def initialize(user, klass)
    @user = user
  end

  def index?
    @user.isAdmin?
  end

  def update?
    @user.isAdmin?
  end

end
