class UsersController < ApplicationController
    skip_before_action :authenticate, only: [:create]
    
    def index
        @users = User.all
        render json: @users

    def create
        @user = User.create(
            username: params[:username],
            password: params[:password],
        )

        payload = { user_id: @user.id }
        token = create_token(payload)

        render json: {
            user: @user.username,
            token: token
        }
    end

    

end
