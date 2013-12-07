class AddRawImageUrlToBikes < ActiveRecord::Migration
  def change
    add_column :bikes, :raw_image_url, :string
  end
end
