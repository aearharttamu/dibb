class NeoBibliograph
  
  include Neo4j::ActiveNode
  
  property :created_at, type: DateTime
  
  has_many :out, :biblios, type: :CONTAINS, model_class: :NeoBiblio
  
  self.mapped_label_name = 'BiblioGraph'
      
  def generate
                        
    Biblio.all.each { |biblio|
      neo_biblio = NeoBiblio.create( biblio.node_properties )
      self.neo_biblios << neo_biblio
      
      biblio.citations.each { |citation| 
        neo_citation = NeoCitation.create( citation.node_properties )
        neo_biblio.citations << neo_citation
      }
    }
    
    Person.all.each { |person|
      neo_person = NeoPerson.create( person.node_properties )
    }    
    
    Publisher.all.each { |publisher|
      neo_publisher = Publisher.create( publisher.node_properties )      
    }
    
    Title.all.each { |title|
      neo_title = Title.create( title.node_properties )
    
      # TODO
      # link them to citations
      # link to people
      # link to publisher
    }    
              
  end

end
