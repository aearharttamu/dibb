class Biblio < ActiveRecord::Base

  has_many :citations
  belongs_to :biblio_set

	def self.list(biblio_set_id)
		biblios = Biblio.where({ biblio_set_id: biblio_set_id })
		biblios.map { |biblio| biblio.obj }
	end

	def obj
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
