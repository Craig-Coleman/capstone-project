class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.integer :period
      t.integer :grade_level
      t.integer :user_id

      t.timestamps
    end
  end
end
