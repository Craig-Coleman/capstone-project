class Course < ApplicationRecord
    belongs_to :user 
    has_many :assignments, -> { order(due_date: :desc)}, dependent: :destroy  
    has_many :periods, dependent: :destroy 
    has_many :students, -> { order(last_name: :asc)}, 
             :through => :periods, dependent: :destroy

    accepts_nested_attributes_for :students

    validates :title, presence: true 
    validates :period, presence: true
    validates :grade_level, presence: true, numericality: { in: 7..12, integer_only: true}
end
