class AddAttachmentImageToBikes < ActiveRecord::Migration
  def self.up
    change_table :bikes do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :bikes, :image
  end
end
