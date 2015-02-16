class CurrentEvent < ActiveRecord::Base
  attr_accessible :content, :key, :title, :image, :color, :content_color, :background_color, :page_url
  has_attached_file :image, :styles => { :medium => "600x600>", :thumb => "100x100>", large: "1400x1400>" }
  scope :most_recent, order("current_events.created_at DESC").limit(10)
  before_save :smart_add_page_url_protocol

  def smart_add_page_url_protocol
    unless self.page_url[/\Ahttp:\/\//] || self.page_url[/\Ahttps:\/\//]
      self.page_url = "http://#{self.page_url}"
    end
  end
  
  def image_url
    image.url(:large) if image.exists?
  end
end
