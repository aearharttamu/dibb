class Publisher < ActiveRecord::Base 
  
  has_many :titles
  has_many :biblios
  
  before_destroy :remove_refs
  
	def self.get_all()
		publishers = Publisher.all
		publishers.map { |publisher| publisher.obj }
	end

	def obj
		{
			id: self.id,
      name: self.name
		}
	end
  
  def node_properties
    { 
      name: self.name
    }
  end  
  
  def remove_refs
    self.titles.each { |title| 
      title.publisher = nil
      title.save
    }
    
    self.biblios.each { |biblio|
      biblio.publisher = nil
      biblio.save
    }    
  end
  
end