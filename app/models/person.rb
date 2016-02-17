class Person < ActiveRecord::Base
   
	def self.get_all()
		people = Person.all
		people.map { |person| person.obj }
	end

	def obj
		{
			id: self.id,
      full_name: self.full_name,
      first_name: self.first_name,
      middle_name: self.middle_name,
      last_name: self.last_name,
      alternative_name: self.alternative_name
		}
	end
   
  def node_properties
    { }
  end
  
end