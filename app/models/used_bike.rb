class UsedBike < ActiveRecord::Base
  attr_accessible :brand, :cost, :kind, :model, :price, :store_id, :year, :size, :fuzzy_size
  belongs_to :store
  validates :store_id,  presence: true
  before_save :make_downcase

  def make_downcase
    kind.try(:downcase)
    fuzzy_size.try(:downcase)
  end

  def get_fuzzy_size
  	if size > 19
  		return "large"
  	elsif size > 17
  		return "medium"
  	else
  		return "small"
  	end
  end
end
