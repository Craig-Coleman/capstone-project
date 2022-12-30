class CoursesController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        user = User.find(session[:user_id]) 
        courses = user.courses 
        render json: courses, status: :ok
    end

    def create
        user = User.find(session[:user_id]) 
        new_course = user.courses.create!(course_params)
        render json: new_course, status: :created 
    end

    def show 
        course = Course.find(params[:id])
        render json: course, status: :ok 
    end

    def update
        course = Course.find(params[:id])
        course.update!(course_params)
        render json: course, status: :ok 
    end

    def destroy 
        course = Course.find(params[:id])
        course.destroy 
        render json: course
    end

    def course_grades
            course = Course.find(params[:id])
            course_grades = []
            course.students.map { |student|
                course_assignments = student.assignments.select{ |assignment| assignment.course_id == course.id}
                course_assignments.sort_by { |assignment| assignment[:due_date] }.reverse
                student_grades = []
                student_grades.push(student.last_name + " , " + student.first_name)
                course_assignments.each do |assignment|
                    student_grades.push(assignment.score)
                end
                course_grades.push(student_grades)
            }
            render json: course_grades, status: :ok
    end

    private 

    def course_params 
        params.permit(:id, :title, :period, :grade_level, :user_id, student_ids: [], students_attributes: [:id, :first_name, :last_name, :grade_level, :classification, :birth_date])
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: 'Course not found' }, status: :not_found 
    end

end
