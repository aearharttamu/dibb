class NeoCitation
  
  include Neo4j::ActiveNode
  
  property :page_number, type: String
  
  has_one :out, :title, type: :CITES, model_class: :NeoTitle
  
  self.mapped_label_name = 'Citation'

end
