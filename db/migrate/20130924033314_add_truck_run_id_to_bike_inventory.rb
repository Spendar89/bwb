class AddTruckRunIdToBikeInventory < ActiveRecord::Migration
  def change
    add_column :bike_inventories, :truck_run_id, :integer
  end
end
