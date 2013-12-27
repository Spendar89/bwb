class AddColumnFuzzySizeToUsedBikes < ActiveRecord::Migration
  def change
    add_column :used_bikes, :fuzzy_size, :string
  end
end
