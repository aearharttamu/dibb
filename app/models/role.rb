class Role < ActiveRecord::Base 
    
	def self.get_all()
		roles = Role.all
		roles.map { |role| role.obj }
	end

	def obj
		{
			id: self.id,
      name: self.name
		}
	end
  
end