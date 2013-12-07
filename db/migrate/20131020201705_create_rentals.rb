class CreateRentals < ActiveRecord::Migration
  def change
    create_table :rentals do |t|
      t.integer :customer_id
      t.integer :store_id
      t.date :date
      t.boolean :paid

      t.timestamps
    end
  end
end
