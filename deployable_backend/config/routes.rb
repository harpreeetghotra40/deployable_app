Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # login routes
  post "/login", to: "auth#create"

  #signup
  post "/users", to: "users#create"
  #get user info
  get "/users", to: "users#index"

  #update_about_me
  post "/users/about", to: "users#update_about_me"

  #get user skills
  get "/users/skills", to: "users#get_skills"
  #update skills
  post "/users/skills", to: "users#update_skills"
  patch "/users/skills", to: "users#patch_skills"

  #get projets
  get "/users/projects", to: "users#get_projects"
end
