class CreatePageNumSequences < ActiveRecord::Migration
  def change
    create_table :page_num_sequences do |t|
      t.integer :biblio_id
      t.string :first_page_number_as_appears
      t.integer :first_page_number
      t.string :final_page_number_as_appears
      t.integer :final_page_number

      t.timestamps null: false
    end
  end
end
