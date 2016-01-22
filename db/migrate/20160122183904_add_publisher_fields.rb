class AddPublisherFields < ActiveRecord::Migration
  def change
    add_column :publishers, :name, :string    
  end
end
