class NeoPublisher
  
  include Neo4j::ActiveNode
  
  has_many :out, :titles, type: :PUBLISHES, model_class: :NeoTitle
  
  self.mapped_label_name = 'Publisher'

end
