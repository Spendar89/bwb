class Rental < ActiveRecord::Base
  attr_accessible :customer_id, :date, :paid, :store_id, :time, :id,
                  :first_name, :mountain_quantities_small,
                  :last_name, :email, :phone_number,
                  :mountain_quantities_medium, :mountain_quantities_large,
                  :road_quantities_small, :road_quantities_medium,
                  :road_quantities_large, :hybrid_quantities_small,
                  :hybrid_quantities_medium, :hybrid_quantities_large

  belongs_to :store
  validates :time, :store_id, :first_name, :last_name, :email, presence: true

  scope :by_time, lambda { |datetime|
    where(time: datetime) unless datetime.nil?
  }

  scope :by_day, lambda { |datetime|
  	return unless datetime
    pds = "#{datetime.month}-#{datetime.day}-#{datetime.year}"
    where("rentals.time IS NOT NULL").select do |rental|
      rds = "#{rental.time.month}-#{rental.time.day}-#{rental.time.year}"
      pds == rds
    end
  }

  # returns all rental reservations that overlap within 4 hours of proposed
  # datetime
  scope :by_fuzzy_time, lambda { |datetime|
  	return unless datetime
  	where("rentals.time IS NOT NULL").select do |rental|
  		(rental.time + 4.hours >= datetime) &&
      (datetime + 4.hours >= rental.time)
  	end
  }

  #returns time in eastern standard time
  def time
  	self[:time].try(:in_time_zone, "Eastern Time (US & Canada)")
  end

  def utc_time
  	self[:time]
  end
end
