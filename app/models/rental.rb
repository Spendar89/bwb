class Rental < ActiveRecord::Base
  attr_accessible :customer_id, :date, :paid, :store_id, :time
  belongs_to :store
  belongs_to :customer
  has_many :rental_bikes, dependent: :destroy
  validates :time, presence: true

  scope :by_time, lambda { |datetime| where(time: datetime) unless datetime.nil? }

  scope :by_day, lambda { |datetime|
  	return unless datetime
    proposed_date_string = "#{datetime.month}-#{datetime.day}-#{datetime.year}"
    where("rentals.time IS NOT NULL").select do |rental|
      rental_date_string = "#{rental.time.month}-#{rental.time.day}-#{rental.time.year}"
      proposed_date_string == rental_date_string
    end
  }
  #returns all rental reservations that overlap within 4 hours of proposed datetime
  scope :by_fuzzy_time, lambda { |datetime|
  	return unless datetime
  	where("rentals.time IS NOT NULL").select do |rental| 
  		(rental.time + 4.hours >= datetime) && (datetime + 4.hours >= rental.time)
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
