class PublicationPlace < ActiveRecord::Base
    
  belongs_to :biblio
  
	def self.list(biblio_id)
		publication_places = PublicationPlace.where({ biblio_id: biblio_id })
		publication_places.map { |publication_place| publication_place.obj }
	end
    
  def obj
    { 
      id: self.id,
      city: self.city,
      state: self.state,
      country: self.country,
      biblio_id: self.biblio_id
    }
  end
  
end