class CreateBikeInventories < ActiveRecord::Migration
  def change
    create_table :bike_inventories do |t|
      t.integer :bike_id
      t.string :size
      t.integer :store_id
      t.integer :cost

      t.timestamps
    end
  end
end
