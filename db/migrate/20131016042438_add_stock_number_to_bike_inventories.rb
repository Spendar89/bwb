class AddStockNumberToBikeInventories < ActiveRecord::Migration
  def change
    add_column :bike_inventories, :stock_number, :string
    add_index :bike_inventories, :stock_number
  end
end
