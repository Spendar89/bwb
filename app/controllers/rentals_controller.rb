class RentalsController < ApplicationController
  respond_to :json

  def index
    @rentals = Rental.all.to_json(include: :store)
    render json: @rentals
  end

  def create
    store = Store.find_by_location params[:rental].delete(:location)
    time = parse_time params[:rental].delete(:date), params[:rental].delete(:time)
    @rental = store.rentals.build(params[:rental].merge({time: time}))
    if @rental.save
      render json: @rental
    else
      render json: { errors: @rental.errors.full_messages }, status: 422
    end
  end

  # def find
  #   if params[:email]
  #     @customer = Customer.find_by_email params[:email]
  #     @rental = Rental.find_by_customer_id @customer.try(:id)
  #     if @rental
  #       render json: @rental
  #     end
  #   end
  # end

  def update
    @rental = Rental.find_by_id params[:rental][:id]
    store = Store.find_by_location params[:rental].delete(:location)
    time = parse_time params[:rental].delete(:date), params[:rental].delete(:time)
    params[:rental][:time] = time if time
    params[:rental][:store_id] = store.try(:id)
    if @rental.nil?
      customer_id = params[:customer][:id]
      render json: { errors: ["Customer with id #{customer_id} could not be found"] }, status: 403
    elsif @rental.update_attributes params[:rental]
      render json: @rental
    else
      render json: { errors: @rental.errors.full_messages }, status: 422
    end
    # @new_quantities = params[:rental].delete(:quantities)
    # if @new_quantities && @rental
    #   @rental.rental_bikes.destroy_all
    #   build_rental_bikes(@new_quantities) if @rental
    # end
    # render json: @rental.to_json if @rental.try(:save)
  end

  private

  # def build_rental_bikes(quantities)
  #   quantities.each do |kind, sizes|
  #     sizes.each do |size, quantity|
  #       next unless quantity
  #       quantity.times { @rental.rental_bikes.build(kind: kind, size: size) }
  #     end
  #   end
  # end

  def parse_time(date, time)
    return unless date.present? && time.present?
    time_string = "#{date} #{time}"
    Chronic.parse(time_string).try :to_datetime
  end

end
