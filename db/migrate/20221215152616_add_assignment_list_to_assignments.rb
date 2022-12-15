class AddAssignmentListToAssignments < ActiveRecord::Migration[7.0]
  def change
    add_reference :assignments, :assignmentList, polymorphic: true, index: true
  end
end
