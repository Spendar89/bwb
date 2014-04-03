class AddColumnsFirstNameAndLastNameAndEmailAndPhoneNumberToRentals < ActiveRecord::Migration
  def change
    add_column :rentals, :first_name, :string
    add_column :rentals, :last_name, :string
    add_column :rentals, :email, :string
    add_column :rentals, :phone_number, :string
  end
end
