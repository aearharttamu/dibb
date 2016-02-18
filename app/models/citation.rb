class Citation < ActiveRecord::Base
  
  belongs_to :biblio
  belongs_to :title
  
	def self.get_all(biblio_id)
    biblio = Biblio.find(biblio_id)
    citations = biblio.citations.order('page_number')
		citations.map { |citation| citation.obj }
	end
  
  def obj
    {
      id: self.id,
      title_id: self.title_id,
      full_text: self.full_text,
      page_number: self.page_number,
      page_number_sequence_id: self.page_number_sequence_id,
      originating_page_number_as_appears: self.originating_page_number_as_appears,
      ending_page_number_as_appears: self.ending_page_number_as_appears,
      category_id: self.category_id,
      notes: self.notes
    }
  end
  
  def node_properties
    { }
  end
  
end