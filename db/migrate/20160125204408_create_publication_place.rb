class CreatePublicationPlace < ActiveRecord::Migration
  def change
    create_table :publication_places do |t|
      t.string :city
      t.string :state
      t.string :country
      t.integer :biblio_id
    end
  end
end
