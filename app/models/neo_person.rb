class NeoPerson
  
  include Neo4j::ActiveNode
  
  has_many :out, :titles, type: :AUTHOR, model_class: :NeoTitle
  
  self.mapped_label_name = 'Person'

end
