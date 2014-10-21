class CurrentEvent < ActiveRecord::Base
  attr_accessible :content, :key, :title, :image, :color, :content_color, :background_color
  has_attached_file :image, :styles => { :medium => "600x600>", :thumb => "100x100>", large: "1400x1400>" }
  scope :most_recent, order("current_events.created_at DESC").limit(10)
  
  def image_url
    image.url(:large) if image.exists?
  end
end
