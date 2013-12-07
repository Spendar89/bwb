class CreateCurrentEventTags < ActiveRecord::Migration
  def change
    create_table :current_event_tags do |t|
      t.integer :tag_id
      t.integer :current_event_id

      t.timestamps
    end
  end
end
