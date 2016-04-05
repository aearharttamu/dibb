class PageNumSequence < ActiveRecord::Base
  belongs_to :biblio
  has_one :citation

  def self.get_all(biblio_id)
    biblio = Biblio.find(biblio_id)
    sequences = biblio.page_num_sequences
    sequences.map { |sequence| sequence.obj }
  end

  def obj
    {
        id: self.id,
        biblio_id: self.biblio_id,
        first_page_number_as_appears: self.first_page_number_as_appears,
        first_page_number: self.first_page_number,
        final_page_number_as_appears: self.final_page_number_as_appears,
        final_page_number: self.final_page_number
    }
  end

end
