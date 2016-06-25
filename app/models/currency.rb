class Currency < ActiveRecord::Base

  has_many :editions

  before_destroy :remove_refs

  def self.get_all()
    currencies = Currency.all.order('name')
    currencies.map { |currency| currency.obj }
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
      edition.currency = nil
      edition.save
    }
  end
  
end
