class CreateBiblio < ActiveRecord::Migration
  def change
    create_table :biblios do |t|
      t.string :title
      t.string :genre
      t.string :date
      t.string :provenance
      t.string :pubnumber
    end
  end
end