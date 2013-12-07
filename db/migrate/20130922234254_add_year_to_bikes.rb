class AddYearToBikes < ActiveRecord::Migration
  def change
    add_column :bikes, :year, :integer
  end
end
