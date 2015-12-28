class NeoBibliograph
  
  include Neo4j::ActiveNode
  
  property :created_at
      
  def generate
                    
    Biblio.all.each { |biblio|
      neo_biblio = NeoBiblio.new( biblio.node_properties )
      self.neo_biblios << neo_biblio
      
      biblio.citations.each { |citation| 
        neo_citation = NeoCitation.new( citation.node_properties )
        neo_biblio.citations << neo_citation
      }
    }
    
    People.all.each { |person|
      neo_person = NeoPerson.new( person.node_properties )
    }    
    
    Publisher.all.each { |publisher|
      neo_publisher = Publisher.new( publisher.node_properties )      
    }
    
    Title.all.each { |title|
      neo_title = Title.new( title.node_properties )
    
      # link them to citations
      # link to people
      # link to publisher
    }    
              
  end

end
