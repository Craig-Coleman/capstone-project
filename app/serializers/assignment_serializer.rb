class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :assign_date, :due_date, :score, :course_id, :student_id

  belongs_to :student
end
