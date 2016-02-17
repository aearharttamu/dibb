class Biblio < ActiveRecord::Base

  has_many :citations, dependent: :destroy
  has_many :publication_places, dependent: :destroy
  belongs_to :biblio_set
  belongs_to :publisher
    
	def self.list(biblio_set_id)
		biblios = Biblio.where({ biblio_set_id: biblio_set_id })
		biblios.map { |biblio| biblio.obj }
	end

  def staff_json()
    [ { id: 23, name: 'frank', role: 'pitcher' } ].to_json
  end
  
  def staff_json=()
    # TODO
  end
  
  def publication_places_json()
    self.publication_places.map { |publication_place| publication_place.obj }.to_json    
  end
  
  def publication_places_json=( proposed_places )
        
    proposed_places = [] if proposed_places.nil? 
    deleted_places = self.publication_places.map { |place| place.id }
    
    proposed_places.each { |proposed_place|
      if proposed_place[:id].nil?
        # add place
        place = PublicationPlace.new(proposed_place)
        place.biblio = self
        place.save
      else
        # update place
        place = PublicationPlace.find_by( id: proposed_place[:id], biblio_id: self.id )
        unless place.nil?
          place.update(proposed_place)
          deleted_places.delete(place.id)
          place.save
        end
      end
    }

    # delete places not found in the proposed list
    PublicationPlace.destroy(deleted_places)
  end

	def obj
    
    publisher_name = Publisher.find(self.publisher_id).name unless self.publisher_id.nil?
    
		{
			id: self.id,
			biblio_set_id: self.biblio_set_id,
			item_as_appears: self.item_as_appears,
			item_number: self.item_number,
			title: self.title,
			descriptors: self.descriptors,
			date_as_appears: self.date_as_appears,
			year: self.year,
			publisher_id: self.publisher_id,
      publisher_name: publisher_name,
      publication_places_json: self.publication_places_json,
      staff_json: self.staff_json,
			provenance: self.provenance,
			pub_number: self.pub_number,
			size: self.size,
			binding: self.binding,
			pagination: self.pagination,
			unnumbered_pages: self.unnumbered_pages,
			contents: self.contents,
			category_as_appears: self.category_as_appears
		}
	end
  
  def node_properties
    { 
      title: self.title, 
      date_as_appears: self.date_as_appears,
      pub_number: self.pub_number
    }
  end

end
