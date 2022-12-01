class CoursesController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

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

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: 'Course not found' }, status: :not_found 
    end

end
