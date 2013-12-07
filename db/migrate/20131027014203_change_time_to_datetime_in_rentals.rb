class ChangeTimeToDatetimeInRentals < ActiveRecord::Migration
  def change
  	remove_column :rentals, :time
  	add_column :rentals, :time, :datetime
  end
end
