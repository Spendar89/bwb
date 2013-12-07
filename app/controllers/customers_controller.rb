class CustomersController < ApplicationController
  respond_to :json
  
  def create
    @customer = Customer.find_or_initialize_by_email(params[:customer])
    @customer.attributes = params[:customer] if @customer.id   
    if @customer.save
      render json: {customer_id: @customer.id}
    else
      render json: {error: "could not create customer"}
    end
  end
  
end
