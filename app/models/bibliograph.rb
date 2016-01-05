class Bibliograph < ActiveRecord::Base
    
  belongs_to :user
  
	def self.list_all
		bibliographs = Bibliograph.all
		bibliographs.map { |bibliograph| bibliograph.obj }
	end
  
  def obj
    {
      id: self.id,
      name: self.name,
      node_count: self.node_count,
      schema_version: self.schema_version,
      created_by: self.user.email,
      created_at: self.created_at
    }
  end
    
  def node_properties
    { 
      name: self.name,
      created_by: self.user.email
    }
  end
  
end