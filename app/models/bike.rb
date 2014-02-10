require 'net/http'
require 'open-uri'
class Bike < ActiveRecord::Base
  attr_accessible :brand, :description, :kind, :model, :photo,
  :price, :quantity, :sale_price, :stock_number,
  :used, :year, :has_image, :speeds, :weight, :comfort, :performance,
  :headline, :material, :brakes, :compenents, :groupset, :image, :raw_image_url
  has_attached_file :image, styles: { medium: "600x600>", thumb: "100x100>", large: "1400x1400>" }, default_url: "/images/:style/missing.png"
  # validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates :model, uniqueness: { scope: [:brand, :year]}
  has_many :inventory, foreign_key: :bike_id, class_name: "BikeInventory", dependent: :destroy

  def self.image_search(brand, model, year)
    images = []
    api_url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyACFiNUhLYiXeP94_i_9V97-bWO9XwO7MQ&cx=000102622598956013572:cohhec-3ap0&searchType=image&imageSize=large&q="
    query = URI.escape("#{brand} #{model} #{year}")
    JSON.parse(open(api_url + query).read)["items"].each_with_index{|image, i| images << {index: i, url: image["link"]}}
    images
  end

  def image_url
    image.url(:large) if has_image
  end

  def self.processed_image(image_url)
    image = MiniMagick::Image.open(image_url)
    image.format :png
    image.combine_options do |c|
      c.fuzz "8%"
      c.transparent "white"
      c.resize "600x600"
    end
    File.open(image.path)
  end

  def to_s
    "#{brand} #{model}"
  end

  def image_main_url
    image_url
  end

  def sizes
    inventory.pluck(:size).uniq
  end

  def inventory_by_size(size)
    inventory.by_size(size)
  end

  def inventory_by_size_and_location(size, location)
    inventory.by_size(size).by_location(location)
  end

  def similar
    price_range = [(price - 100)..(price + 100)]
    Bike.where(price: price_range, kind: kind).where("bikes.id != ?", id)
  end

  def availability
    Store.all.map do |store|
      sizes_array = []
      sizes.each do |size|
        is_available = inventory_by_size_and_location(size, store.location).count > 0
        sizes_array << size if is_available
      end
      {location: store.location, sizes: sizes_array}
    end
  end

  def image_thumb_url
    image.url(:thumb) if image.exists?
  end
end
