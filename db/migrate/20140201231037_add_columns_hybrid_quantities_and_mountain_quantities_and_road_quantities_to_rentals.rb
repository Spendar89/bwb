class AddColumnsHybridQuantitiesAndMountainQuantitiesAndRoadQuantitiesToRentals < ActiveRecord::Migration
  def change
    add_column :rentals, :hybrid_quantities, :integer
    add_column :rentals, :mountain_quantities, :integer
    add_column :rentals, :road_quantities, :integer
  end
end
