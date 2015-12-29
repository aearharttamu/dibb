class BiblioSet < ActiveRecord::Base

  has_many :biblios

	def self.list_all
		biblio_sets = BiblioSet.all
		biblio_sets.map { |biblio_set| biblio_set.obj }
	end

	def obj
		biblios = Biblio.list(self.id)
		{
			id: self.id,
			title: self.title,
			genre: self.genre,
			other_genre: self.other_genre,
			items: biblios
		}
	end

end
