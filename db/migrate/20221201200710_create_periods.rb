class CreatePeriods < ActiveRecord::Migration[7.0]
  def change
    create_table :periods do |t|
      t.integer :number
      t.time :start_time
      t.time :end_time
      t.integer :course_id
      t.integer :student_id

      t.timestamps
    end
  end
end
