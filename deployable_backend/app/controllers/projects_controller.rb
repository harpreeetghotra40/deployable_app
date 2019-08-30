class UsersController < ApplicationController
  skip_before_action :authorized

  def index
    byebug
    render json: @user.projects.as_json(
      except: [:id, :updated_at, :created_at],
    )
  end

  def create
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
