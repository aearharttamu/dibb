class Role < ActiveRecord::Base 
  
  has_many :staff, dependent: :destroy
  
	def self.get_all()
		roles = Role.all.order('name')
		roles.map { |role| role.obj }
	end

	def obj
		{
			id: self.id,
      name: self.name
		}
	end
  
  def rel_properties
    {
      role: self.name      
    }
  end
  
end