class Format < ActiveRecord::Base

  has_many :editions

  before_destroy :remove_refs

  def self.get_all()
    roles = Format.all.order('name')
    roles.map { |format| format.obj }
  end

  def obj
    {
        id: self.id,
        name: self.name
    }
  end

  def rel_properties
    {
        format: self.name
    }
  end
  
  def remove_refs
    self.editions.each { |edition|
      edition.format = nil
      edition.save
    }
  end
  
end
