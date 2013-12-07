class BikeInventoriesController < ApplicationController
  
  def new
    @truck_run = TruckRun.find(params[:truck_run_id])
    @bike_inventory = BikeInventory.new(truck_run_id: @truck_run.id)
  end
  
  def create
    @quantity = params[:bike_inventory][:quantity].to_i
    @truck_run = TruckRun.find(params[:bike_inventory][:truck_run_id])   
    @quantity.times do
      @truck_run.bike_inventories.create(params[:bike_inventory])
    end
  end
  
  def index
    respond_to do |format|
      format.json { render json: BikeInventory.all.to_json(include: [:bike, :store]) }
    end
  end
end
