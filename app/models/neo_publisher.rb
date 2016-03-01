class NeoPublisher
  
  include Neo4j::ActiveNode

  property :name, type: String
  
  has_many :out, :titles, type: :PUBLISHED, model_class: :NeoTitle
  has_many :out, :biblios, type: :PUBLISHED, model_class: :NeoBiblio
  
  self.mapped_label_name = 'Publisher'

end
