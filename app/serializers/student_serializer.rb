class StudentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :grade_level, :classification, :birth_date

end
