class NeoRole
  
  include Neo4j::ActiveNode
  
  property :name, type: String
    
  self.mapped_label_name = 'Role'

end
