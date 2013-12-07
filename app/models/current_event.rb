class CurrentEvent < ActiveRecord::Base
  attr_accessible :content, :key, :title, :image
  has_attached_file :image, :styles => { :medium => "600x600>", :thumb => "100x100>" }
  scope :most_recent, order("current_events.created_at DESC").limit(10)
  
  def image_url
    image.url(:medium) if image.exists?
  end
end
