class NeoTitle
  
  include Neo4j::ActiveNode
  
  has_many :out, :citations, type: :CITES, model_class: :NeoCitation
  
  self.mapped_label_name = 'Title'

end
