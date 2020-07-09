class EventsController < ApplicationController
    skip_before_action :authenticate, only: [:create]
    
    def index
        @events = Event.where(user_id: @user.id)
        render json: @events
    end


    def create
        @event = Event.create(event_params)
        render json: @event
    end

    # def update
    #     @event.update(event_params)
    #     render json: @event
    # end

    # def destroy
    #     @event.destroy
    #     render json: { message: "You destroyed the event." }
    # end
    private

    def event_params
        params.require(:event).permit(:name, :location, :start_time, :end_time).merge(user_id: @user.id)
    end
end
