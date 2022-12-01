class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.integer :grade_level
      t.string :classification
      t.date :birth_date

      t.timestamps
    end
  end
end
