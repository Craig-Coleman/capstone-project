class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :assign_date, :due_date, :score

end
