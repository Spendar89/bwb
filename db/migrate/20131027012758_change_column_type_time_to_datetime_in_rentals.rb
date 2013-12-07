class ChangeColumnTypeTimeToDatetimeInRentals < ActiveRecord::Migration
  def change
  	change_column :rentals, :time, :datetime
  end

end
