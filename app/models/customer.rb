class Customer < ActiveRecord::Base
  attr_accessible :email, :first_name, :last_name
  has_many :rentals
end
