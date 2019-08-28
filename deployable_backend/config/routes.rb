Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # login routes
  post "/login", to: "auth#create"
  #signup
  post "/users", to: "users#create"

  #get portfolio
  get "/portfolio", to: "portfolios#index"

  #update skills
  post "/portfolio/skills", to: "portfolios#update_skills"

  #update_about_me
  post "/portfolio/about", to: "portfolios#update_about_me"
end
