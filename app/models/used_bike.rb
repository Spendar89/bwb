class UsedBike < ActiveRecord::Base
  attr_accessible :brand, :cost, :kind, :model, :price, :store_id, :year, :size
  belongs_to :store

  def fuzzy_size
  	if size > 19
  		return "large"
  	elsif size > 17
  		return "medium"
  	else
  		return "small"
  	end
  end
end
