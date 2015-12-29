class Title < ActiveRecord::Base
  
  belongs_to :publisher
  has_many :citations  
  
  def node_properties
    { }
  end
  
end