class NeoPerson
  
  include Neo4j::ActiveNode

  property :full_name, type: String
  property :alternative_name, type: String


  has_many :out, :titles, type: :NeoRole, model_class: :NeoTitle
  has_many :out, :biblios, type: :NeoRole, model_class: :NeoBiblio
  
  self.mapped_label_name = 'Person'

end
