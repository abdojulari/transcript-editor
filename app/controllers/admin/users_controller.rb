class Admin::UsersController < AdminController

  before_action :set_user, only: [:show, :update, :destroy]

  def index
    authorize User

    @users = User.getAll.decorate
    @user_roles = UserRole.getAll
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
      params.require(:user).permit(:user_role_id)
    end

end
