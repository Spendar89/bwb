class RemoveColumnTruckRunIdFromBikeInventories < ActiveRecord::Migration
  def change
  	remove_column :bike_inventories, :truck_run_id
  end
end
