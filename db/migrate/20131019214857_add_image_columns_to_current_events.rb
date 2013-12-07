class AddImageColumnsToCurrentEvents < ActiveRecord::Migration
  def self.up
    remove_column :current_events, :image_url
    add_attachment :current_events, :image
  end

  def self.down
    add_column :current_events, :image_url, :string
    remove_attachment :current_events, :image
  end
end
