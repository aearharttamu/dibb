class AddPeopleFields < ActiveRecord::Migration
  def change
    add_column :people, :full_name, :string  
    add_column :people, :first_name, :string  
    add_column :people, :middle_name, :string  
    add_column :people, :last_name, :string  
    add_column :people, :alternative_name, :string  
  end
end
