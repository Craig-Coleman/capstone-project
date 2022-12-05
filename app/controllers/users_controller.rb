class UsersController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    skip_before_action :authorize, only: :create    

    def show 
        user = User.find_by(id: session[:user_id])
        if user 
            render json: user
        else
            render json: { error: "Not authorized" }, status: :unauthorized 
        end
    end

    def create 
        user = User.create!(user_params)
        if user
            session[:user_id] = user.id 
            render json: user, status: :created
        end 
    end

    private  

    def user_params 
        params.permit(:username, :first_name, :last_name, :email, :password, :password_confirmation)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found 
    end

end
