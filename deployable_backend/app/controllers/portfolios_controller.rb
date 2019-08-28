class PortfoliosController < ApplicationController
  def index
    @portfolio = Portfolio.find_by(:user_id => @user.id)
    render json: @portfolio.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  def update_skills
    skill = params[:skill].downcase
    @portfolio = Portfolio.find_by(:user_id => @user.id)
    if (@portfolio.skills == nil)
      @portfolio.skills = [skill]
    elsif (!@portfolio.skills.include?(skill))
      @portfolio.skills << skill
    end
    @portfolio.save
    render json: @portfolio.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    ), status: :created
  end

  def update_about_me
    about = params[:about_me]
    @portfolio = Portfolio.find_by(:user_id => @user.id)
    @portfolio.about_me = about
    @portfolio.save
    render json: @portfolio.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    ), status: :created
  end
end
