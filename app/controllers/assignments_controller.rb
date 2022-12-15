class AssignmentsController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        assignments = Assignment.all 
        render json: assignments, status: :ok  
    end

    def create  
        assignment = Assignment.create!(assignment_params)
        render json: assignment, status: :created 
    end

    def show 
        byebug
        assignment = Assignment.find(params[:id])
        render json: assignment, status: :ok 
    end

    def update 
        assignment = Assignment.find(params[:id])
        assignment.update!(assignment_params)
        render json: assignment, status: :ok
    end

    def destroy
        assignment = Assignment.find(params[:id])
        assignment.destroy 
        head :no_content 
    end

    private

    def assignment_params 
        params.permit(:id, :title, :description, :assign_date, :due_date, :score, :student_id, :course_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: 'Assignment not found' }, status: :not_found 
    end

end
