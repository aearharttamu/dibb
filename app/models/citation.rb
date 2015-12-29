class Citation < ActiveRecord::Base
  
  belongs_to :biblio
  has_one :title
  
  def node_properties
    { }
  end
  
end