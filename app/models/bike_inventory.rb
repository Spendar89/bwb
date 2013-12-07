class BikeInventory < ActiveRecord::Base
  attr_accessible :bike_id, :cost, :size, :store_id, :quantity, :truck_run_id
  validates :bike_id, presence: true
  validates :truck_run_id, presence: true
  validates :store_id, presence: true
  validates :quantity, presence: true
  validates :size, presence: true
  belongs_to :bike, foreign_key: :bike_id
  belongs_to :store
  belongs_to :truck_run
  
  scope :by_size, lambda {|size| where(size: size) }  
  scope :by_location, lambda {|location| joins(:store).where("stores.location ILIKE ?", location)}
  
  attr_accessor :quantity
end
