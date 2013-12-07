class TruckRun < ActiveRecord::Base
  attr_accessible :complete, :date
  has_many :bike_inventories
end
