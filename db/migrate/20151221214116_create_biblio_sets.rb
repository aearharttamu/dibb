class CreateBiblioSets < ActiveRecord::Migration
  def change
    create_table :biblio_sets do |t|
      t.string :title
      t.string :genre

      t.timestamps null: false
    end
  end
end
