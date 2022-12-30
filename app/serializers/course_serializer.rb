class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :period, :grade_level

  has_many :assignments
end
