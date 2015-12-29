class Publisher < ActiveRecord::Base 
  
  has_many :titles
  
  def node_properties
    { }
  end
  
end