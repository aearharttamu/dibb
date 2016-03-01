class NeoRole
  
  include Neo4j::ActiveRel

  property :role, type: String

  from_class :NeoPerson
  to_class   :any

  type 'CONTRIBUTES'
      
end
