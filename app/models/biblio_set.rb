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
    
    # if this is a single item type biblio set, pre-fetch that item
    biblio = ( self.genre == 'print-monograph'   || 
               self.genre == 'digital-monograph'    ) ? biblios.first.obj : nil
    
		{
			id: self.id,
			title: self.title,
			genre: self.genre,
			other_genre: self.other_genre,
      biblio: biblio
		}
	end

end
