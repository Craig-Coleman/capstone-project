class Assignment < ApplicationRecord
    belongs_to :course 
    belongs_to :student 

    validates :title, presence: true
    validates :assign_date, presence: true 
    validates :due_date, presence: true 
    validates :score, inclusion: { in: "/" }, presence: true, numericality: { greater_than_or_equal_to: 0 }, allow_blank: true
end
