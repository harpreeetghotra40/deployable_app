class AddGithubProfileLinkToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :github_profile_link, :string
  end
end
