class RentalsController < ApplicationController
  respond_to :json
  
  def create
    store = Store.find_by_location(params[:rental].delete(:location))
    quantities = params[:rental].delete(:quantities)
    time = Chronic.parse("#{params[:rental].delete(:date)} #{params[:rental].delete(:time)}").to_datetime
    @rental = store.rentals.build(params[:rental].merge({time: time}))
    build_rental_bikes(quantities) if @rental
    render json: @rental.to_json(include: :rental_bikes) if @rental.save
  end

  def update
    @rental = Rental.find_by_id(params[:rental][:id])
    @new_quantities = params[:rental].delete(:quantities)
    if @new_quantities && @rental
      @rental.rental_bikes.destroy_all
      build_rental_bikes(@new_quantities) if @rental
    end
    render json: @rental.to_json if @rental.try(:save)
  end

  private

  def build_rental_bikes(quantities)
    quantities.each do |kind, sizes|
      sizes.each do |size, quantity|
        next unless quantity
        quantity.times { @rental.rental_bikes.build(kind: kind, size: size) }
      end
    end
  end
  
end
