class AddColumnPhoneNumberToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :phone_number, :integer
  end
end
