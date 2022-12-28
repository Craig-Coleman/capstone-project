class PeriodsSerializer < ActiveModel::Serializer
  attributes :id, :number, :start_time, :end_time, :student_id, :course_id
end
