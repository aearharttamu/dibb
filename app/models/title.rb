class Title < ActiveRecord::Base
  
  belongs_to :publisher
  has_many :citations  
  
  before_destroy :remove_refs
	
  def self.get_all()
		titles = Title.all
		titles.map { |title| title.obj }
	end  
  
  def obj
    { 
      id: self.id,
      name: self.name,
      is_review: self.is_review,
      review_full_text: self.review_full_text,
      serial_title: self.serial_title,
      serial_volume_as_appears: self.serial_volume_as_appears,
      serial_issue_as_appears: self.serial_issue_as_appears,
      encompassing_title_id: self.encompassing_title_id    
    }
  end

  def node_properties
    { }
  end
  
  def remove_refs
    self.citations.each { |citation|
      citation.title = nil
      citation.save
    }
  end
  
end