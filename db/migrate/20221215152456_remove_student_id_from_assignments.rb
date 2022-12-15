class RemoveStudentIdFromAssignments < ActiveRecord::Migration[7.0]
  def change
    remove_column :assignments, :student_id 
  end
end
