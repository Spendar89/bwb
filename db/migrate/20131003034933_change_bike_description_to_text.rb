class ChangeBikeDescriptionToText < ActiveRecord::Migration
  def change
    change_column :bikes, :description, :text
  end
end
