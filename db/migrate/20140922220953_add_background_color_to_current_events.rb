class AddBackgroundColorToCurrentEvents < ActiveRecord::Migration
  def change
    add_column :current_events, :background_color, :string, default: "rgba(255,255,255, 0.9)"
  end
end
