class Store < ActiveRecord::Base
  attr_accessible :location
  has_many :inventory, class_name: "BikeInventory"
  has_many :bikes, through: :inventory, uniq: true
  has_many :used_bikes
  has_many :rentals
  
  def to_s
    "#{location}"
  end

  def todays_rentals
  	rentals.by_datetime(DateTime.now)
  end

  def todays_rental_bikes
  	todays_rentals.map(&:rental_bikes)
  end
  #check expected rental bike availability for a given date and time
  def rental_bike_availability(datetime)
    rental_bike_ids = rentals.by_datetime(datetime).map(&:rental_bikes)

  end
end
