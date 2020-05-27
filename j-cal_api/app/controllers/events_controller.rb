class EventsController < ApplicationController
    def index
        @events = Event.all
        render json: @events
    end

    def show
            @event = Event.find(params[:id])
            render json: @event
        end

    def create
        @event = Event.create(event_params)
        render json: @event
    end

    def update
        @event.update(event_params)
        render json: @user
    end

    def destroy
        @event.destroy
        render json: { message: "You destroyed the event." }
    end
    
    private

    def event_params
        params.require(:event).permit(:event, :location, :start_time, :end_time)
    end
end
