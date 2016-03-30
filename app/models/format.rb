class Format < ActiveRecord::Base

  has_many :editions

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
end
