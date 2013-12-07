class RentedBike < ActiveRecord::Base
  attr_accessible :rental_id, :used_bike_id
  belongs_to :rental
  belongs_to :used_bike
end
