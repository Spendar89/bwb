class Store < ActiveRecord::Base
  attr_accessible :location
  has_many :inventory, class_name: "BikeInventory"
  has_many :bikes, through: :inventory, uniq: true
  has_many :used_bikes
  has_many :rentals
  has_many :rental_bikes, through: :rentals

  def to_s
    "#{location}"
  end

  def todays_rentals
  	rentals.by_datetime(DateTime.now)
  end

  def todays_rented_bikes
  	todays_rentals.map(&:rental_bikes).flatten
  end
  #check expected rental bike availability for a given date and time
  def available_used_bikes(datetime)
    rented_bikes = rentals.by_fuzzy_time(datetime).map(&:rental_bikes).flatten
    all_used_bikes = used_bikes
    rented_bikes.each do |rb|
      all_used_bikes.delete_if do |ub|
        ub.kind.downcase == rb.kind.downcase &&
        ub.fuzzy_size.downcase == rb.size.downcase
      end
    end
    return all_used_bikes.compact
  end

  def self.seed_stores
    loc = ["Georgetown", "Old Town", "Bethesda", "Arlington", "Potomac"]
    loc.each{ |l| create({ location: l }) }
  end

end
