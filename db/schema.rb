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

ActiveRecord::Schema.define(:version => 20131221202133) do

  create_table "average_points", :force => true do |t|
    t.integer  "player_id"
    t.float    "average"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "average_pts", :force => true do |t|
    t.integer  "player_id"
    t.float    "average"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

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
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
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
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "customers", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "events", :force => true do |t|
    t.integer  "game_id"
    t.integer  "player_id"
    t.integer  "count"
    t.integer  "type"
    t.integer  "action"
    t.integer  "period"
    t.time     "time_rem"
    t.string   "desc"
    t.string   "score"
    t.integer  "margin"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "games", :force => true do |t|
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.integer  "home_team_id"
    t.integer  "away_team_id"
    t.date     "date"
    t.string   "season"
  end

  create_table "inventories", :force => true do |t|
    t.integer  "store_id"
    t.integer  "bike_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "lineups", :force => true do |t|
    t.integer  "game_id"
    t.integer  "team_id"
    t.integer  "start_count"
    t.integer  "end_count"
    t.float    "start_time"
    t.float    "end_time"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "players", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "team_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "players_lineups", :force => true do |t|
    t.integer  "lineup_id"
    t.integer  "player_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
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
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.datetime "time"
  end

  create_table "rented_bikes", :force => true do |t|
    t.integer  "rental_id"
    t.integer  "used_bike_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "statlines", :force => true do |t|
    t.integer  "player_id"
    t.integer  "game_id"
    t.integer  "pts"
    t.integer  "rbs"
    t.integer  "fgm"
    t.integer  "fga"
    t.float    "fg_pct"
    t.integer  "fg3m"
    t.integer  "fg3a"
    t.float    "fg3_pct"
    t.integer  "ftm"
    t.integer  "fta"
    t.float    "ft_pct"
    t.integer  "oreb"
    t.integer  "dreb"
    t.integer  "ast"
    t.integer  "stl"
    t.integer  "blk"
    t.string   "tointeger"
    t.integer  "pf"
    t.integer  "plus_minus"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "reb"
    t.integer  "to"
    t.integer  "team_id"
    t.float    "min"
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

  create_table "teams", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "city"
    t.string   "nickname"
  end

  create_table "truck_runs", :force => true do |t|
    t.datetime "date"
    t.boolean  "complete"
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
