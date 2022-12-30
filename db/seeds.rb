# puts "Starting seed..."
# user1 = User.create(username: "craig.coleman", first_name: "Craig", last_name: "Coleman", email: "craig.coleman@teacher.com", password: "123")
# course1 = user1.courses.create({id: 0, title: "Biology", period: 1, grade_level: 9})
# course2 = user1.courses.create(title: "Chemistry", period: 2, grade_level: 10)
# student1 = Student.create(first_name: "John", last_name: "Smith", grade_level: 9, classification: "freshman", birth_date: 20081119)
# period1 = course1.periods.create(number: course1.period, start_time: '08:50', end_time: '08:50', student_id: student1.id)
# assignment1 = student1.assignments.create(title: "Chapter 1 Homework", description: "Page 59 Questions 1-15", assign_date: 20110820, due_date: 20220819, score: 100, course_id: course1.id, student_id: student1.id)
# assignment2 = student1.assignments.create(title: "Chapter 2 Homework", description: "Page 65 Questions 1-10", assign_date: 20220821, due_date: 20220820, score: 100, course_id: course1.id, student_id: student1.id)

# user2 = User.create(username: "conor", first_name: "Conor", last_name: "Coleman", email: "conor.coleman@teacher.com", password: "321")
# course3 = user2.courses.create(title: "Algebra 2", period: 1, grade_level: 10)
# student2 = Student.create(first_name: "Jane", last_name: "Doe", grade_level: 10, classification: "sophomore", birth_date: 20071119)
# period = course3.periods.create(number: course3.period, start_time: '08:50', end_time: '08:50', student_id: student2.id)
# assignment3 = student2.assignments.create(title: "Chapter 3 Homework", description: "Page 59 Questions 1-15", assign_date: 20220820, due_date: 20220821, score: 100, course_id: course3.id, student_id: student2.id)

# puts "Seed Completed!"