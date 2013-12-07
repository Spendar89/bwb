class CreateUsedBikes < ActiveRecord::Migration
  def change
    create_table :used_bikes do |t|
      t.integer :store_id
      t.string :brand
      t.string :model
      t.date :year
      t.string :kind
      t.string :price
      t.string :cost

      t.timestamps
    end
  end
end
