class AddColumnTimeToRentals < ActiveRecord::Migration
  def change
    add_column :rentals, :time, :time
  end
end
