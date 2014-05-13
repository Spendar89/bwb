class AddColumnsQuantitiesToRentals < ActiveRecord::Migration
  def change
    remove_column :rentals, :hybrid_quantities
    remove_column :rentals, :mountain_quantities
    remove_column :rentals, :road_quantities
    add_column :rentals, :hybrid_quantities_small, :integer
    add_column :rentals, :hybrid_quantities_medium, :integer
    add_column :rentals, :hybrid_quantities_large, :integer
    add_column :rentals, :mountain_quantities_small, :integer
    add_column :rentals, :mountain_quantities_medium, :integer
    add_column :rentals, :mountain_quantities_large, :integer
    add_column :rentals, :road_quantities_small, :integer
    add_column :rentals, :road_quantities_medium, :integer
    add_column :rentals, :road_quantities_large, :integer
  end
end
