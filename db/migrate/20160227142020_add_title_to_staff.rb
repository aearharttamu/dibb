class AddTitleToStaff < ActiveRecord::Migration
  def change
    add_column :staffs, :title_id, :integer
  end
end
