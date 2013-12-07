class AddSizeToUsedBike < ActiveRecord::Migration
  def change
    add_column :used_bikes, :size, :integer
  end
end
