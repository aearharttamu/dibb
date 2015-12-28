class NeoCitation
  
  include Neo4j::ActiveNode
  

  self.mapped_label_name = 'Citation'

end
