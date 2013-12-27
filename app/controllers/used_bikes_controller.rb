class UsedBikesController < ApplicationController
  respond_to :json
  
  def create
    @location = params[:used_bike].delete(:location)
    store_id = Store.find_by_location(@location.try(:capitalize)).id
    @used_bike = UsedBike.new(params[:used_bike].merge({store_id: store_id}))
    @used_bike.fuzzy_size = @used_bike.get_fuzzy_size
    if @used_bike.save!
       render json: { used_bike: @used_bike.to_json } 
    else
      render json: { error: "used bike was not saved to the database" }
    end
  end
  
  def index
    @location = params[:location].try(:capitalize)
    if @store = Store.find_by_location(@location)
      time = Chronic.parse("#{params[:date]} #{params[:time]}").to_datetime if params[:time]
      @used_bikes = time ? @store.available_used_bikes(time) : @store.used_bikes
    else
      @used_bikes = UsedBike.all
    end
    render json: @used_bikes.to_json
  end

  def update
    @used_bike = UsedBike.find(params[:id])
    filtered_params = params[:used_bike].slice("brand", "model", "size", "cost", "price")
    if @used_bike.update_attributes(filtered_params)
      render json: @used_bike.to_json
    else
      render json: { error: "used bike was not updated" }
    end
  end
  
end
