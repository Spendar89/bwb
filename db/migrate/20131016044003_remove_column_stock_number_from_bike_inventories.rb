class RemoveColumnStockNumberFromBikeInventories < ActiveRecord::Migration
  def change
    remove_column :bike_inventories, :stock_number
  end
end
