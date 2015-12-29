class Citation < ActiveRecord::Base
  
  belongs_to :biblio
  belongs_to :title
  
  def node_properties
    { }
  end
  
end