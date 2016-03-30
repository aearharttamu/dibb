class Edition < ActiveRecord::Base

  belongs_to :title
  belongs_to :currency
  belongs_to :format

  def self.get_all()
    editions = Edition.all
    editions.map { |edition| edition.obj }
  end

  def obj
    {
        id: self.id,
        format_id: self.format.id,
        currency_id: self.currency.id,
        price: self.price,
        title_id: self.title_id,
        currency: self.currency.name,
        format: self.format.name
    }
  end

end
