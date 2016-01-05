class Bilbiograph < ActiveRecord::Base
    
  has_one :user
    
  def node_properties
    { 
      name: self.name,
      created_by: self.user.email
    }
  end
  
end