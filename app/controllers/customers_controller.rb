class CustomersController < ApplicationController
  respond_to :json

  def create
    phone_number = params[:customer].delete :phone_number

    @customer = Customer.new(params[:customer])
    @customer.phone_number = phone_number.gsub(/\D/,'').to_i

    if @customer.save
      render json: @customer
    else
      render json: { errors: @customer.errors.full_messages }, status: 422
    end
  end

  def show
    @customer = Customer.find(params[:customer])
  end

  # def find
  #   @customer = Customer.find_by_email params[:customer][:email]
  #   if @customer
  #   render json: @customer
  # end

  def update
    @customer = Customer.find_by_id params[:customer][:id]
    if @customer.nil?
      render json: { errors: ["Customer with id #{params[:customer][:id]} could not be found"] }
    elsif @customer.update_attributes params[:customer].slice(:email, :first_name, :last_name, :phone_number)
       render json: @customer
    else
      render json: { errors: @customer.errors.full_messages }, status: 422
    end
  end

end
