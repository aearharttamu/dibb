class NeoBiblio
  
  include Neo4j::ActiveNode
  
  property :title, type: String
  property :date_as_appears, type: String
  property :pub_number, type: String
  
  has_many :out, :citations, type: :CONTAINS, model_class: :NeoCitation

  self.mapped_label_name = 'Biblio'

end
