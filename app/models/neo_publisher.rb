class NeoPublisher
  
  include Neo4j::ActiveNode

  property :name, type: String
  
  has_many :out, :titles, type: :PUBLISHED, model_class: :NeoTitle
  
  self.mapped_label_name = 'Publisher'

end
