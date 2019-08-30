class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def index
    render json: @user.as_json(
             except: [:id, :password_digest, :updated_at, :created_at],
           )
  end

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

  def update_about_me
    about = params[:about_me]
    @user.about_me = about
    @user.save
    render json: @user.as_json(
      except: [:id, :updated_at, :created_at],
    ), status: :created
  end

  def update_skills
    skill = params[:skill_name].downcase
    skillToAdd = Skill.find_by(skill_name: skill)
    # byebug
    if skillToAdd && !UserSkill.find_by(user_id: @user.id, skill_id: skillToAdd.id)
      UserSkill.create!(user_id: @user.id, skill_id: skillToAdd.id)
    elsif skillToAdd == nil
      new_skill_created = Skill.create!(skill_name: skill)
      new_skill_created.save
      user_skill = UserSkill.create!(user_id: @user.id, skill_id: new_skill_created.id)
      user_skill.save
    end
    render json: @user.skills.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  def patch_skills
    skill_to_be_deleted = Skill.find_by(skill_name: params[:delete_skill])
    user_skill_to_be_deleted = UserSkill.where(:user_id => @user.id, :skill_id => skill_to_be_deleted.id)
    user_skill_to_be_deleted.destroy_all
    render json: @user.skills.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  def get_skills
    render json: @user.skills.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
