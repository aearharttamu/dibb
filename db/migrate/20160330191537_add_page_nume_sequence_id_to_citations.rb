class AddPageNumeSequenceIdToCitations < ActiveRecord::Migration
  def change
    add_column :citations, :page_num_sequence_id, :integer
  end
end
