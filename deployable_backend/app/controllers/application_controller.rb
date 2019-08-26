# frozen_string_literal: true

KEY_PATH = Rails.root.join("config", "keys", "private_key.key")

def encode_with_jwt(payload)
  key = IO.binread(KEY_PATH)
  if (key == nil) || (key.empty?)
    raise StandardError
  end
  JWT.encode(payload, key)
end

def decode_with_jwt(payload)
  key = IO.binread(KEY_PATH)
  if (key == nil) || (key.empty?)
    puts "Check your key file in #{KEY_PATH}"
    raise StandardError
  end
  JWT.decode(payload, key, true, algorithm: "HS256")
end

class ApplicationController < ActionController::API
  # https://learn.co/tracks/module-4-web-development-immersive-2-1/auth/jwt-auth-in-rails/jwt-auth-rails
  before_action :authorized

  def encode_token(payload)
    encode_with_jwt(payload)
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers["Authorization"]
  end

  def decoded_token
    if auth_header
      # byebug
      token = auth_header.split(" ")[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        decode_with_jwt(token)
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]["user_id"]
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
  end

  def authorized
    if !(logged_in?)
      render json: {
               errors: {
                 message: "Please log in",
                 errors: :unauthorized.to_s,
               },
               status: :unauthorized,
             }
    end
  end
end
