class Student < ApplicationRecord
    has_many :periods 
    has_many :assignments, as: :assignmentList, dependent: :destroy  
    has_many :courses, through: :periods 

    validates :first_name, presence: true 
    validates :last_name, presence: true 
    validates :grade_level, presence: true, numericality: { in: 7..12, only_integer: true  }
    validates :classification, presence: true 
    validates :birth_date, presence: true 

end
