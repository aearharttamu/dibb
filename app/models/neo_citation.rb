class NeoCitation
  
  include Neo4j::ActiveNode
  
  has_one :out, :title, type: :CITES, model_class: :NeoTitle
  
  self.mapped_label_name = 'Citation'

end
