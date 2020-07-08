class ApplicationController < ActionController::API
    def authenticate
        begin
            authorization_header = request.headers["Authorization"]
            token = authorization_header.split(" ")[1]
            secret = Rails.application.secret_key_base
            payload = JWT.decode(token, secret)[0]
            @user =User.find(payload["user_id"])
        rescue
            render json: { error: "Invalid!" }
        end
    end
end
