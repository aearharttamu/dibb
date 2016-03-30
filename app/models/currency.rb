class Currency < ActiveRecord::Base

  has_many :editions

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
end
