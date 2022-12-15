class ApplicationController < ActionController::Base
    include ActionController::Cookies

    skip_before_action :verify_authenticity_token

    # before_action :authorize
  
    def authorize
      render json: { errors: ["Not authorized"] }, status: :unauthorized unless User.find_by(id: session[:user_id])
    end

end
