class StudentsController < ApplicationController

    wrap_parameters false

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        students = Student.all 
        render json: students, status: :ok 
    end

    def create 
        student = Student.create!(student_params)
        render json: student, status: :created 
    end

    def show
        student = Student.find(params[:id])
        render json: student, status: :ok 
    end

    def update 
        student = Student.find(params[:id])
        student.update!(student_params)
        render json: student, status: :ok 
    end

    def destroy 
        student = Student.find(params[:id])
        student.destroy 
        render json: student
    end

    def assignments_index 
        student = Student.find(params[:student_id])
        assignments = student.assignments 
        render json: assignments, include: :student 
    end

    private
    
    def student_params
        params.permit(:id, :first_name, :last_name, :grade_level, :classification, :birth_date, period_ids: [], :periods_attributes => [:id, :number, :course_id, :start_time, :end_time], assignment_ids: [], :assignments_attributes => [:title, :description, :assign_date, :due_date, :score, :course_id])
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: 'Assignment not found' }, status: :not_found 
    end

end
