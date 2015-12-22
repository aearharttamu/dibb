class CreateBiblios < ActiveRecord::Migration
  def change
    create_table :biblios do |t|
      t.integer :biblio_set_id
      t.string :item_as_appears
      t.integer :item_number
      t.string :title
      t.text :descriptors
      t.string :date_as_appears
      t.integer :year
      t.integer :publisher_id
      t.string :provenance
      t.string :pub_number
      t.integer :size
      t.string :binding
      t.boolean :pagination
      t.boolean :unnumbered_pages
      t.text :contents
      t.string :category_as_appears

      t.timestamps null: false
    end
  end
end
