class ApplicationController < ActionController::Base
    include ActionController::Cookies

    before_action :authorize
  
    def authorize
      render json: { errors: ["Not authorized"] }, status: :unauthorized unless User.find_by(id: session[:user_id])
    end
    
end
