class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  # def login
  #   don't need to login here auth takes care of it
  #   byebug
  # end

  def create
    begin
      @user = User.create!(user_params)
      @portfolio = Portfolio.create!(:user_id => @user.id)
      token = encode_token(user_id: @user.id)
      render json: {
        jwt: token,
        username: @user.name,
      }, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
      render json: {
        errors: {
          message: ["user information is not valid!"],
          errors: invalid,
        },
      }, status: :unauthorized
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
