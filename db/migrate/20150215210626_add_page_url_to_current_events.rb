class AddPageUrlToCurrentEvents < ActiveRecord::Migration
  def change
    add_column :current_events, :page_url, :string
  end
end
