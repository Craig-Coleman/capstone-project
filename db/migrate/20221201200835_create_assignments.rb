class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.string :title
      t.text :description
      t.date :assign_date
      t.date :due_date
      t.integer :score
      t.integer :student_id
      t.integer :course_id

      t.timestamps
    end
  end
end
