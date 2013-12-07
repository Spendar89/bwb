class CurrentEventsController < ApplicationController
  respond_to :json
  
  def create
    @current_event = CurrentEvent.new(params[:current_event])
    if @current_event.save
      render json: @current_event.to_json
    end
  end
  
  # def show
  #   @current_event = CurrentEvent.find(params[:current_event])
  # end
  
  def index
    respond_to do |format|
      format.json {render json: CurrentEvent.most_recent.to_json(methods: [:image_url])}
    end
  end
end
