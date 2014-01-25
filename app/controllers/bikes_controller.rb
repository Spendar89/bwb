class BikesController < ApplicationController
  def new
    @bike = Bike.new
  end

  def create
    @bike = Bike.find_or_initialize_by_brand_and_model_and_year(params[:bike])
    @bike.attributes = params[:bike] if @bike.id
    respond_to do |format|
      if @bike.save && @bike.create_image
        format.json { render json: { bike: @bike.to_json } }
      else
        format.json { render json: { error: "bike was not saved to the database" } }
      end
    end
  end

  def index
    respond_to do |format|
      format.html { redirect_to "/#/bikes"}
      format.json {render json: Bike.where(has_image: true).to_json(include: :inventory, methods: :availability)}
    end
  end

  def show
    respond_to do |format|
      format.html {redirect_to "/#/bikes/#{params[:id]}"}
      format.json {render json: Bike.find(params[:id]).to_json(include: :inventory, methods: :availability)}
    end
  end

  def images
    @images = Bike.image_search(params[:brand], params[:model], params[:year])
    respond_to do |format|
      format.json { render json: @images.to_json }
    end
  end

  def add_image
    @image_url = params[:image_url]
    @bike = Bike.find(params[:id])
    @bike.create_image(@image_url)
    respond_to do |format|
      format.js {head :ok}
    end
  end

  def availability
    @bike = Bike.find(params[:bike])
    respond_to do |format|
      format.json { render json: @bike.availability }
    end
  end

end
