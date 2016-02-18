class AddTitleFields < ActiveRecord::Migration
  def change
    add_column :titles, :name, :string  
    add_column :titles, :is_review, :boolean  
    add_column :titles, :review_full_text, :text  
    add_column :titles, :serial_title, :string  
    add_column :titles, :serial_volume_as_appears, :string
    add_column :titles, :serial_issue_as_appears, :string
    add_column :titles, :encompassing_title_id, :integer
  end
end
