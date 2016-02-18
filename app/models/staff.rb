class Staff < ActiveRecord::Base 
  
  belongs_to :biblio
  belongs_to :person
  belongs_to :role
  
	def obj
		{
			id: self.id,
      name: self.person.full_name,
      person_id: self.person_id,
      role: self.role.name,
      role_id: self.role_id
		}
	end
  
end