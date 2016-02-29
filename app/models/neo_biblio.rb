class NeoBiblio
  
  include Neo4j::ActiveNode
  
  property :title, type: String
  property :item_number, type: String
  property :provenance, type: String
  property :category_as_appears, type: String  
  property :date_as_appears, type: String
  property :pub_number, type: String
  
  has_many :out, :citations, type: :CONTAINS, model_class: :NeoCitation

  self.mapped_label_name = 'Biblio'

end
