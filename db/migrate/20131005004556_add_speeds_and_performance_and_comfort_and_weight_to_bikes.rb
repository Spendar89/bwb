class AddSpeedsAndPerformanceAndComfortAndWeightToBikes < ActiveRecord::Migration
  def change
    add_column :bikes, :speeds, :integer
    add_column :bikes, :performance, :integer
    add_column :bikes, :comfort, :integer
    add_column :bikes, :weight, :integer
  end
end
