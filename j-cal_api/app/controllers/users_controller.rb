class UsersController < ApplicationController
    before_action :authenticate, :only [:index]

    def index
        @users = User.all
        render json: @users
    end

    def show
            @user = User.find(params[:id])
            render json: @user
        end

    def create
        @user = User.create(user_params)
        render json: @user
    end

    def update
        @user.update(user_params)
        render json: @user
    end

    def destroy
        @user.destroy
        render json: { message: "You destroyed the user." }
    end
    
    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
