class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.references :user, null: false, foreign_key: true
      t.string :project_name
      t.string :image_link
      t.string :project_description
      t.string :github_link

      t.timestamps
    end
  end
end
