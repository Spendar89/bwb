class RentalBike < ActiveRecord::Base
  attr_accessible :kind, :rental_id, :size
  belongs_to :rental
end
