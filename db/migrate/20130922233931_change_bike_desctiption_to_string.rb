class ChangeBikeDesctiptionToString < ActiveRecord::Migration
  def change
    change_column :bikes, :description, :string
  end
end
