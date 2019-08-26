class Portfolio < ApplicationRecord
  belongs_to :user
  serialize :skills
end
