class CreateBikes < ActiveRecord::Migration
  def change
    create_table :bikes do |t|
      t.string :brand
      t.string :model
      t.string :kind
      t.integer :stock_number
      t.integer :price
      t.integer :sale_price
      t.integer :quantity
      t.integer :description
      t.string :photo
      t.boolean :used

      t.timestamps
    end
  end
end
