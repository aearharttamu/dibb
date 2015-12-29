class NeoTitle
  
  include Neo4j::ActiveNode
    
  self.mapped_label_name = 'Title'

end
