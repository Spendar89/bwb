class AddMaterialAndBrakesAndGroupoToBikes < ActiveRecord::Migration
  def change
    add_column :bikes, :material, :string
    add_column :bikes, :brakes, :string
    add_column :bikes, :groupset, :string
  end
end
