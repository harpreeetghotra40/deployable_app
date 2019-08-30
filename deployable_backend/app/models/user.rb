class User < ApplicationRecord
  has_secure_password
  has_many :user_skills
  has_many :projects
  has_many :skills, through: :user_skills
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
end
