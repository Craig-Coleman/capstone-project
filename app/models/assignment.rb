class Assignment < ApplicationRecord
    belongs_to :assignmentList, polymorphic: true

    validates :title, presence: true
    validates :assign_date, presence: true 
    validates :due_date, presence: true 
    validates :score, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
