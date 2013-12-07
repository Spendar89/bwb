class RemoveColumnDateFromRentals < ActiveRecord::Migration
  def change
  	remove_column :rentals, :date
  end

end
