class Staff < ActiveRecord::Base 
  
  belongs_to :biblio
  belongs_to :person
  belongs_to :role
        
  def new_person_name=( name )
    # if a name is provided, use it to create a new person (otherwise, person_id links to it)
    self.person = Person.new({ full_name: name })  unless name.blank?
  end
  
	def obj
		{
			id: self.id,
      person_name: self.person.nil? ? nil : self.person.full_name,
      person_id: self.person_id,
      role: self.role.nil? ? nil : self.role.name,
      role_id: self.role_id
		}
	end
  
end