class Course < ApplicationRecord
    belongs_to :user 
    has_many :assignments, dependent: :destroy  
    has_many :periods 
    has_many :students, through: :periods 
end
