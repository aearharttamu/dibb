class NeoBibliograph
  
  include Neo4j::ActiveNode
  
  property :name, type: String
  property :created_by, type: String
  property :created_at, type: DateTime
  
  has_many :out, :biblios, type: :CONTAINS, model_class: :NeoBiblio
  
  self.mapped_label_name = 'BiblioGraph'
      
  def generate

    neo_people = []
    Person.all.each { |person|
      neo_person = NeoPerson.create( person.node_properties )
      neo_people[ neo_person.id ] = neo_person;
    }

    neo_roles = []
    Role.all.each { |role|
      neo_role = NeoRole.create( role.edge_properties )
      neo_roles[ role.id ] = neo_role      
    } 

    neo_publishers = []
    Publisher.all.each { |publisher|
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
      
      title.staffs.each { |staff|
        
        neo_person = neo_people[ staff.person.id ]
        neo_role = neo_roles[ staff.role.id ]
        
        # TODO how to express role?
        neo_person.titles << neo_title
        
      } unless title.staffs.nil?
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
      
      unless biblio.publisher.nil?
        neo_publisher = neo_publishers[ biblio.publisher.id ]
        neo_publisher.titles << neo_title
      end
      
      biblio.staffs.each { |staff|
        
        neo_person = neo_people[ staff.person.id ]
        neo_role = neo_roles[ staff.role.id ]
        
        # TODO how to express role?
        neo_person.biblios << neo_biblio
        
      } unless biblio.staffs.nil?      

      self.biblios << neo_biblio
    }    
  end

end
