class CoursesController < ApplicationController

    def index 
        courses = Course.all 
        render json: courses, status: :ok
    end

    def create 
        course = Course.create!(course_params)
        render json: course, status: :created 
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
        head :no_content 
    end

    private 

    def course_params 
        params.permit(:id, :title, :period, :grade_level, :user_id)
    end
    
end
