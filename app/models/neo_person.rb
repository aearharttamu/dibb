class NeoPerson
  
  include Neo4j::ActiveNode

  property :full_name, type: String
  property :alternative_name, type: String


  has_many :out, :titles, rel_class: :NeoRole
  has_many :out, :biblios, rel_class: :NeoRole
  
  self.mapped_label_name = 'Person'

end
