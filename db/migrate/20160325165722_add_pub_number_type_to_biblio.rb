class AddPubNumberTypeToBiblio < ActiveRecord::Migration
  def change
    add_column :biblios, :pub_number_type, :string
  end
end
