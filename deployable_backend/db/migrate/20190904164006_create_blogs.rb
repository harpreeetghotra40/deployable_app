class CreateBlogs < ActiveRecord::Migration[6.0]
  def change
    create_table :blogs do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :blog_link
      t.string :image_link

      t.timestamps
    end
  end
end
