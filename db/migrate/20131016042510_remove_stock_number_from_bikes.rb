class RemoveStockNumberFromBikes < ActiveRecord::Migration
  def change
    remove_column :bikes, :stock_number
  end
end
