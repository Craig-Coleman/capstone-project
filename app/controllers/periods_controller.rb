class PeriodsController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        periods = Period.all 
        render json: periods, status: :ok 
    end

    def create 
        period = Period.create!(period_params)
        render json: period, status: :created 
    end

    def show
        period = Period.find(params[:id])
        render json: period, status: :ok 
    end

    def update 
        period = Period.find(params[:id])
        period.update!(period_params)
        render json: period, status: :ok
    end

    def destroy 
        period = Period.find(params[:id])
        period.destroy
        head :no_content 
    end

    private

    def period_params 
        params.permit(:id, :number, :start_time, :end_time, :course_id, :student_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: 'Course not found' }, status: :not_found 
    end

end
