class NeoBibliograph
  
  include Neo4j::ActiveNode
  
  property :name, type: String
  property :created_by, type: String
  property :created_at, type: DateTime
  
  has_many :out, :biblios, type: :CONTAINS, model_class: :NeoBiblio
  
  self.mapped_label_name = 'BiblioGraph'
      
  def generate

    neo_publishers = []
    Publisher.all.map { |publisher|
      neo_publisher = NeoPublisher.create( publisher.node_properties )   
      neo_publishers[ publisher.id ] = neo_publisher
    }

    neo_titles = []
    Title.all.each { |title|
      neo_title = NeoTitle.create( title.node_properties )
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
        neo_biblio.citations << neo_citation
        
        unless citation.title.nil?
          neo_title = neo_titles[ citation.title.id ]
          neo_citation.title = neo_title 
        end
      }      

      self.biblios << neo_biblio
    }    
  end

end
