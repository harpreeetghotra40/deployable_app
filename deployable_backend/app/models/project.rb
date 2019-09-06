class Project < ApplicationRecord
  belongs_to :user
  validates :project_name, presence: true
end
