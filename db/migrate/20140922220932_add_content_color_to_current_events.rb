class AddContentColorToCurrentEvents < ActiveRecord::Migration
  def change
    add_column :current_events, :content_color, :string, default: "#333"
  end
end
