class Title < ActiveRecord::Base
  
  include MergeMany
  
  belongs_to :publisher
  has_many :citations  
  has_many :staffs, dependent: :destroy
  
  before_destroy :remove_refs
	
  def self.get_all()
		titles = Title.all
		titles.map { |title| title.obj }
	end  
  
  def staff_json
   self.staffs.map { |staff| staff.obj }.to_json    
  end
  
  def staff_json=( proposed_staff )
    merge_many_changes( Staff, :title_id, self.staffs, proposed_staff )
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
      encompassing_title_id: self.encompassing_title_id,
      staff_json: self.staff_json
    }
  end

  def node_properties
    { 
      id: self.id,
      name: self.name,
      serial_title: self.serial_title,
      serial_volume_as_appears: self.serial_volume_as_appears,
      serial_issue_as_appears: self.serial_issue_as_appears,
      is_review: self.is_review
    }
  end
  
  def remove_refs
    self.citations.each { |citation|
      citation.title = nil
      citation.save
    }
  end
  
end