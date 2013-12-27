class BikeInventoriesController < ApplicationController
  
  def new
    @truck_run = TruckRun.find_or_create_by_id(params[:truck_run_id])
    @bike_inventory =  @truck_run.bike_inventories.new
  end
  
  def create
    store_id = Store.find_by_location(params[:inventory].delete(:location)).try(:id)
    quantity = params[:inventory].delete(:quantity).to_i
    attrs = params[:inventory].merge({store_id: store_id})
    if BikeInventory.new(attrs).valid? && quantity > 0
      quantity.times { BikeInventory.create(attrs) }
    else
      @errors = true
    end
    respond_to do |format|
      format.json { render json: { success: !@errors }.to_json }
    end

  end

  def update
    @bike_inventory = BikeInventory.find(params[:id])
    location = params[:inventory][:store][:location]
    store_id = Store.find_by_location(location.capitalize).try(:id)
    filtered_params = params[:inventory].slice(:size).merge({store_id: store_id})
    if @bike_inventory.update_attributes(filtered_params)
       render json: @bike_inventory.to_json
    else
       render json: { error: "inventory was not updated" }
    end
  end

  def transfer
    location = params[:inventory][:location]
    store_id = Store.find_by_location(location.capitalize).id
    @bike_inventory = BikeInventory.where(id: params[:inventory][:inventory])
    if  @bike_inventory.update_all(store_id: store_id)
       render json: @bike_inventory.to_json
    else
       render json: { error: "inventory was not updated" }
    end
  end
  
  def index
    respond_to do |format|
      format.json { render json: BikeInventory.all.to_json(include: [:bike, :store]) }
    end
  end

  def show
    @bike_inventory = BikeInventory.find(params[:id])
     respond_to do |format|
      format.json { render json:  @bike_inventory.all.to_json(include: [:bike, :store]) }
    end
  end
end
