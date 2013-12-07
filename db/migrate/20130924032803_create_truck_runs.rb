class CreateTruckRuns < ActiveRecord::Migration
  def change
    create_table :truck_runs do |t|
      t.datetime :date
      t.boolean :complete

      t.timestamps
    end
  end
end
