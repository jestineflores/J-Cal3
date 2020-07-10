class ApplicationController < ActionController::API
    before_action :authenticate

    def auth_header
        request.headers["Authorization"]
    end

    def token
        auth_header.split(" ")[1]
    end

    def secret
        Rails.application.secrets.secret_key_base
    end

    def authenticate
        if auth_header
            begin
                decoded_token = JWT.decode(token, secret)
                payload = decoded_token.first
                user_id = payload["user_id"]
                @user = User.find(user_id)
            rescue
                render json: { error: "Invalid!" }, status: :forbidden
            end
        else
            render json: { error: "Invalid" }, status: :forbidden
        end
    end

end
