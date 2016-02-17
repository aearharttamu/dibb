class Staff < ActiveRecord::Base 
  
  belongs_to :biblio
  
	def obj
		{
			id: self.id,
      person_id: self.person_id,
      role_id: self.role_id
		}
	end
  
end