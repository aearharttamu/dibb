class AddOtherGenreToBiblioSet < ActiveRecord::Migration
  def change
    add_column :biblio_sets, :other_genre, :string
  end
end
