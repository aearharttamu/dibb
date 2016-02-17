class CreateStaff < ActiveRecord::Migration
  def change
    create_table :staffs do |t|
      t.integer :biblio_id
      t.integer :person_id
      t.integer :role_id
      t.timestamps null: false
    end
  end
end
