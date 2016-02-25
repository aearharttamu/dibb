class Bibliograph < ActiveRecord::Base
    
  belongs_to :user
  
	def self.list_all
		bibliographs = Bibliograph.all.order('created_at DESC')
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
  
  def create_neo_graph
    neo_dibb = NeoDibb.root_node
    neo_dibb.generate( self )
  end  
  
  def remove_neo_graph
    # TODO
  end
  
  def node_properties
    { 
      name: self.name,
      created_by: self.user.email
    }
  end
  
end