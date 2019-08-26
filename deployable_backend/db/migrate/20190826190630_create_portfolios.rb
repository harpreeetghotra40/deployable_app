class CreatePortfolios < ActiveRecord::Migration[6.0]
  def change
    create_table :portfolios do |t|
      t.references :user, null: false, foreign_key: true
      t.string :about_me
      t.string :github_link
      t.text :skills

      t.timestamps
    end
  end
end
