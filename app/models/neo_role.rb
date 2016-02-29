class NeoRole
  
  include Neo4j::ActiveRel
  
  property :name, type: String
    
end
