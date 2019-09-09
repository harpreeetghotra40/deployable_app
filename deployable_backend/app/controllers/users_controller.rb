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

  def projects
    projects = Project.all
    if projects.length > 10
      projects = projects.sample(10)
    end
    render json: projects.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  def get_projects
    render json: @user.projects.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  def create_project
    new_project = @user.projects.create!(project_params)
    new_project.save
  end

  def project_show
    project = @user.projects.find_by(:project_name => params[:projectName])
    render json: project.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  def get_blogs
    render json: @user.blogs.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  def create_blog
    new_blog = @user.blogs.create!(blogs_params)
    new_blog.save
  end

  def edit_desc
    project = Project.find_by(:project_name => params[:project][:project_name], :github_link => params[:project][:github_link])
    project.project_description = params[:project_description]
    project.save
  end

  def get_developers
    users = User.all
    render json: users.as_json(
      except: [:id, :password_digest, :user_id, :updated_at, :created_at],
    )
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :github_profile_link)
  end

  def project_params
    params.require(:new_project).permit(:project_name, :image_link, :project_description, :github_link)
  end

  def blogs_params
    params.require(:new_blog).permit(:title, :image_link, :blog_link)
  end
end
