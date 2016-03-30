class CreateEditions < ActiveRecord::Migration
  def change
    create_table :editions do |t|
      t.integer :format_id
      t.integer :currency_id
      t.decimal :price

      t.timestamps null: false
    end
  end
end
