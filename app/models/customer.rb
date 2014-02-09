class Customer < ActiveRecord::Base
  attr_accessible :email, :first_name, :last_name, :phone_number, :created_at, :id, :updated_at, :id, :deleted_at
  validates_presence_of :email, :first_name, :last_name
  validates :email, uniqueness: true
  has_many :rentals, dependent: :destroy
  before_validation :destroy_if_expired

  def destroy_if_expired
    customer = Customer.find_by_email email
    return unless customer
    rental = customer.rentals.first
    return true unless rental
    if rental.time < Time.now
      rental.destroy
      customer.destroy
    end
  end

end
