class Citation < ActiveRecord::Base
  
  belongs_to :biblio
  belongs_to :title
  belongs_to :page_num_sequence 

  
	def self.get_all(biblio_id)
    biblio = Biblio.find(biblio_id)
    citations = biblio.citations.order('page_number')
		citations.map { |citation| citation.obj }
	end
  
  def title_name
    !self.title.nil? ? self.title.name : nil
  end
  
  def title_name=( name )
    self.title = Title.new({ name: name }) unless name.blank?
  end

  def page_num_sequences_json
    self.biblio.page_num_sequences.map { |seq|
      { text: "#{seq.first_page_number_as_appears}...#{seq.final_page_number_as_appears}", value: seq.id }
    }.to_json   
  end
  
  def list_obj
    {
      id: self.id,
      page_number: self.page_number,
      title_name: self.title_name
    }
  end

  def obj
    {
      id: self.id,
      title_id: self.title_id,
      title_name: self.title_name,
      category_name: '--',
      full_text: self.full_text,
      page_number: self.page_number,
      page_num_sequence_id: self.page_num_sequence_id,
      page_num_sequences_json: self.page_num_sequences_json,
      originating_page_number_as_appears: self.originating_page_number_as_appears,
      ending_page_number_as_appears: self.ending_page_number_as_appears,
      category_id: self.category_id,
      notes: self.notes
    }
  end
  
  def node_properties
    { 
      page_number: self.page_number
    }
  end
  
end