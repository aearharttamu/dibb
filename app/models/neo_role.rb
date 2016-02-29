class NeoRole
  
  include Neo4j::ActiveRel
  
  property :name, type: String
    
  self.mapped_label_name = 'Role'

end
