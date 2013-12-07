class AddImageUrlToBikes < ActiveRecord::Migration
  def change
    add_column :bikes, :image_url, :string
  end
end
