class ChangeUsedBikesYearToInteger < ActiveRecord::Migration
  def change
    remove_column :used_bikes, :year
    add_column :used_bikes, :year, :integer
  end
end
