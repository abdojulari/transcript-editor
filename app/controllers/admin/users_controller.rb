class Admin::UsersController < AdminController
  before_action :set_user, only: [:update]

  def index
    authorize User

    @users = policy_scope(User).only_public_users.getAll.decorate
    @staff = policy_scope(User).only_staff_users.getAll.decorate
    @user_roles = policy_scope(UserRole).getAll
    @institutions = policy_scope(Institution).all
  end

  # PATCH/PUT /admin/users/{id}.json
  def update
    authorize User

    if @user.update(user_params)
      head :no_content
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:user_role_id, :institution_id)
  end
end
