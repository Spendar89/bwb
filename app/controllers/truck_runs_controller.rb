class TruckRunsController < ApplicationController
  def new
    @truck_run = TruckRun.new
  end
  
  def create
    @truck_run = TruckRun.new(date: DateTime.now)
    redirect_to new_bike_inventory_path(truck_run_id: @truck_run.id) if @truck_run.save
  end
end
