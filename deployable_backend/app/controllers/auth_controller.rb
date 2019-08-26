class AuthController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def create
    @user = User.find_by(email: user_login_params[:email])
    #authenticate comes from BCrypt
    if @user && @user.authenticate(user_login_params[:password])
      # encode token comes from ApplicationController
      token = encode_token({ user_id: @user.id })
      render json: { email: @user.email, jwt: token }, status: :accepted
    else
      render json: {
        errors: {
          message: ["Invalid email or password"],
        },
      }, status: :unauthorized
    end
  end

  private

  def user_login_params
    # params { user: {email: 'chandlerBing@friends.com', password: 'sarcasmKing' } }
    params.require(:user).permit(:email, :password)
  end
end
