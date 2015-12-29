class CreateCitations < ActiveRecord::Migration
  def change
    create_table :citations do |t|
      t.integer :title_id
      t.integer :biblio_id
      t.timestamps null: false
    end
  end
end
