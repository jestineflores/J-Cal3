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

    # def update
    #     @user.update(user_params)
    #     render json: @user
    # end

    # def create_calendar
    #     if @user.calendar.nil?
    #         @user.calendar = Calendar.create(:user_id => @user.id)
    #     end
    #     @user.calendar
    # end
    
    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
