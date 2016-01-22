class Publisher < ActiveRecord::Base 
  
  has_many :titles
  has_many :biblios
  
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
    { }
  end
  
end