class CreateRentedBikes < ActiveRecord::Migration
  def change
    create_table :rented_bikes do |t|
      t.integer :rental_id
      t.integer :used_bike_id

      t.timestamps
    end
  end
end
