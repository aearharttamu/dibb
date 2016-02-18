class AddCitationFields < ActiveRecord::Migration
  def change
    add_column :citations, :full_text, :text  
    add_column :citations, :page_number, :integer
    add_column :citations, :page_number_sequence_id, :integer
    add_column :citations, :originating_page_number_as_appears, :string
    add_column :citations, :ending_page_number_as_appears, :string
    add_column :citations, :category_id, :integer
    add_column :citations, :notes, :text
  end
end
