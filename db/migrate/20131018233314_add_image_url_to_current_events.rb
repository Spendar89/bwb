class AddImageUrlToCurrentEvents < ActiveRecord::Migration
  def change
    add_column :current_events, :image_url, :string
  end
end
