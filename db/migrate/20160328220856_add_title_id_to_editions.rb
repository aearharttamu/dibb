class AddTitleIdToEditions < ActiveRecord::Migration
  def change
    add_column :editions, :title_id, :integer
  end
end
