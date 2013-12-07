class CreateCurrentEvents < ActiveRecord::Migration
  def change
    create_table :current_events do |t|
      t.string :title
      t.text :content
      t.string :key

      t.timestamps
    end
  end
end
