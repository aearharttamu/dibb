class NeoBibliograph
  
  include Neo4j::ActiveNode
  
  property :created_at, type: DateTime
  
  has_many :out, :biblios, type: :CONTAINS, model_class: :NeoBiblio
  
  self.mapped_label_name = 'BiblioGraph'
      
  def generate

    neo_publishers = []
    Publisher.all.map { |publisher|
      neo_publisher = Publisher.create( publisher.node_properties )   
      neo_publishers[ publisher.id ] = neo_publisher
    }

    neo_titles = []
    Title.all.each { |title|
      neo_title = Title.create( title.node_properties )
      neo_titles[ title.id ] = neo_title
      
      unless title.publisher.nil?
        neo_publisher = neo_publishers[ title.publisher.id ]
        neo_publisher.titles << neo_title
      end
    }
                            
    Biblio.all.each { |biblio|
      neo_biblio = NeoBiblio.create( biblio.node_properties )
      
      biblio.citations.each { |citation| 
        neo_citation = NeoCitation.create( citation.node_properties )
        neo_citation.title = neo_titles[ citation.title.id ] unless citation.title.nil?
        neo_biblio.citations << neo_citation
      }      

      self.biblios << neo_biblio
    }    
  end

end
