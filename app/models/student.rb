class Student < ApplicationRecord
    has_many :periods 
    has_many :assignments, dependent: :destroy  
    has_many :courses, through: :periods 
end
