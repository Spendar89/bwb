# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140922220953) do

  create_table "bike_inventories", :force => true do |t|
    t.integer  "bike_id"
    t.string   "size"
    t.integer  "store_id"
    t.integer  "cost"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "bikes", :force => true do |t|
    t.string   "brand"
    t.string   "model"
    t.string   "kind"
    t.integer  "price"
    t.integer  "sale_price"
    t.integer  "quantity"
    t.text     "description"
    t.string   "photo"
    t.boolean  "used"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.integer  "year"
    t.string   "image_url"
    t.boolean  "has_image"
    t.string   "raw_image_url"
    t.integer  "speeds"
    t.integer  "performance"
    t.integer  "comfort"
    t.integer  "weight"
    t.string   "headline"
    t.string   "material"
    t.string   "brakes"
    t.string   "groupset"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "current_event_tags", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "current_event_id"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "current_events", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.string   "key"
    t.datetime "created_at",                                               :null => false
    t.datetime "updated_at",                                               :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "color",              :default => "white"
    t.string   "content_color",      :default => "#333"
    t.string   "background_color",   :default => "rgba(255,255,255, 0.9)"
  end

  create_table "customers", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.integer  "phone_number"
  end

  create_table "rental_bikes", :force => true do |t|
    t.integer  "rental_id"
    t.string   "kind"
    t.string   "size"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "rentals", :force => true do |t|
    t.integer  "customer_id"
    t.integer  "store_id"
    t.boolean  "paid"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.datetime "time"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "phone_number"
    t.integer  "hybrid_quantities_small"
    t.integer  "hybrid_quantities_medium"
    t.integer  "hybrid_quantities_large"
    t.integer  "mountain_quantities_small"
    t.integer  "mountain_quantities_medium"
    t.integer  "mountain_quantities_large"
    t.integer  "road_quantities_small"
    t.integer  "road_quantities_medium"
    t.integer  "road_quantities_large"
  end

  create_table "stores", :force => true do |t|
    t.string   "location"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tags", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "used_bikes", :force => true do |t|
    t.integer  "store_id"
    t.string   "brand"
    t.string   "model"
    t.string   "kind"
    t.string   "price"
    t.string   "cost"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "size"
    t.integer  "year"
    t.string   "fuzzy_size"
  end

end
