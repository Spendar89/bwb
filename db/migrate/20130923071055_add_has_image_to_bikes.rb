class AddHasImageToBikes < ActiveRecord::Migration
  def change
    add_column :bikes, :has_image, :boolean
  end
end
