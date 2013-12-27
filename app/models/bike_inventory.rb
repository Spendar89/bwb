class BikeInventory < ActiveRecord::Base
  attr_accessible :bike_id, :cost, :size, :store_id, :quantity, :truck_run_id
  validates :bike_id, presence: true
  validates :store_id, presence: true
  validates :size, presence: true
  belongs_to :bike, foreign_key: :bike_id
  belongs_to :store
  
  scope :by_size, lambda {|size| where(size: size) }  
  scope :by_location, lambda {|location| joins(:store).where("stores.location ILIKE ?", location)}
  
  attr_accessor :quantity

  #TODO: Add an added_by column to see which employee added the inventory
end
