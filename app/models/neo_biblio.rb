class NeoBiblio
  
  include Neo4j::ActiveNode
  
  has_many :out, :citations, type: :CONTAINS, model_class: :NeoCitation

  self.mapped_label_name = 'Biblio'

end
