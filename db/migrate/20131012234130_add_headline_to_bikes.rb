class AddHeadlineToBikes < ActiveRecord::Migration
  def change
    add_column :bikes, :headline, :string
  end
end
