class AddColorToCurrentEvents < ActiveRecord::Migration
  def change
    add_column :current_events, :color, :string, default: "white"
  end
end
