class Period < ApplicationRecord
    belongs_to :student 
    belongs_to :course 

    validates :number, presence: true, numericality: { in: 1..8, only_integer: true}
    validates :start_time, presence: true 
    validates :end_time, presence: true
end
