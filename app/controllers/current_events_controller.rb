class CurrentEventsController < ApplicationController
  respond_to :json

  def create
    @current_event = CurrentEvent.new(params[:current_event])
    if @current_event.save
      render json: @current_event
    end
  end

  def update
    @current_event = CurrentEvent.find_by_id(params[:current_event][:id])
    if @current_event.update_attributes!(params[:current_event].slice(:content, :image, :title))
      render json: @current_event
    end

  end

  def show
    current_event = CurrentEvent.find_by_id(params[:id])
    render json: current_event
  end

  def destroy
    current_event = CurrentEvent.find(params[:id])
    id = @current_event.try(:id)
    if current_event.try(:destroy)
      render json: {message: "successfully destroyed current event with id #{id}"}
    else
      render json: {message: "could not destroy current event with id #{id}"}
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
