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

  #get all projects
  get "/projects", to: "users#projects"
  #get projects
  get "/users/projects", to: "users#get_projects"
  #show project
  get "/projects/:projectName", to: "users#project_show"
  #create projects
  post "/users/projects", to: "users#create_project"
  #edit project desc
  patch "/projects/description", to: "users#edit_desc"

  #get blogs
  get "/users/blogs", to: "users#get_blogs"
  #create blogs
  post "/users/blogs", to: "users#create_blog"

  #get Developers
  get "/users/developers", to: "users#get_developers"
end
