class UsersController < ApplicationController
  skip_before_action :authorized

  def index
    render json: @user.projects.as_json(
      except: [:id, :updated_at, :created_at],
    )
  end

  def create
  end
end
