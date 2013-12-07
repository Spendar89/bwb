class UsedBikesController < ApplicationController
  respond_to :json
  
  def create
    @store = Store.find_by_location(params[:used_bike].delete(:location).capitalize)
    @used_bike = @store.used_bikes.find_or_initialize_by_brand_and_model_and_year(params[:used_bike])
    @used_bike.attributes = params[:used_bike] if @used_bike.id
    @used_bike.store_id = @store.id
    if @used_bike.save
       render json: { used_bike: @used_bike.to_json } 
    else
      render json: { error: "used bike was not saved to the database" }
    end
  end
  
  def index
    if params[:location]
      @store = Store.find_by_location(params[:location])
      @used_bikes = UsedBike.where(store_id: @store.id)
    else
      @used_bikes = UsedBike.all
    end
    render json: @used_bikes.to_json
  end
  
end
