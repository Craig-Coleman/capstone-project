class Course < ApplicationRecord
    belongs_to :user 
    has_many :assignments, dependent: :destroy  
    has_many :periods 
    has_many :students, through: :periods 

    validates :title, presence: true 
    validates :period, presence: true
    validates :grade_level, presence: true, numericality: { in: 7..12, integer_only: true}
end
