class AssignmentsController < ApplicationController

    def index 
        assignments = Assignment.all 
        render json: assignments, status: :ok  
    end

    def create  
        assignment = Assignment.create!(assignment_params)
        render json: assignment, status: :created 
    end

    def show 
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
    
end
