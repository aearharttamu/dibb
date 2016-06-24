class BiblioSet < ActiveRecord::Base

  has_many :biblios, dependent: :destroy

	def self.get_page(page, per_page=20)
		biblio_sets = BiblioSet.paginate( page: page, per_page: per_page )
		biblio_sets.map { |biblio_set| biblio_set.obj }
	end

	def self.get_all()
		biblio_sets = BiblioSet.all
		biblio_sets.map { |biblio_set| biblio_set.obj }
	end

	def obj
    
    # TODO if this is a single item type biblio set, pre-fetch that item
    # biblio = ( self.genre == 'print-monograph'   ||
    #            self.genre == 'digital-monograph'    ) ? biblios.first.obj : nil
    biblio = self.biblios.first
    
		{
			id: self.id,
			title: self.title,
			genre: self.genre,
			other_genre: self.other_genre,
      biblio: biblio.nil? ? nil : biblio.obj
		}
	end

end
