class CreateRentalBikes < ActiveRecord::Migration
  def change
    create_table :rental_bikes do |t|
      t.integer :rental_id
      t.string :kind
      t.string :size

      t.timestamps
    end
  end
end
