puts "Starting seed..."
user = User.create(username: "craig.coleman", first_name: "Craig", last_name: "Coleman", email: "craig.coleman@teacher.com", password: "123")
course = user.courses.create(title: "Biology", period: 1, grade_level: 9)
student = Student.create(first_name: "John", last_name: "Smith", grade_level: 9, classification: "freshman", birth_date: 20081119)
period = course.periods.create(number: course.period, start_time: '08:50', end_time: '08:50', student_id: student.id)
assignment = student.assignments.create(title: "Chapter 1 Homework", description: "Page 59 Questions 1-15", assign_date: 20220820, due_date: 20220821, score: 100, course_id: course.id)
puts "Seed Completed!"
