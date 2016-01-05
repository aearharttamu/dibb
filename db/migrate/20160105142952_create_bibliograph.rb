class CreateBibliograph < ActiveRecord::Migration
  def change
    create_table :bibliographs do |t|
      t.string :name
      t.integer :node_count
      t.string :schema_version
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
