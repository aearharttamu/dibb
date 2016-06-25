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
        format_id: self.format ? self.format.id : nil,
        currency_id: self.currency ? self.currency.id : nil,
        price: self.price,
        title_id: self.title_id,
        currency: self.currency ? self.currency.name : nil,
        format: self.format ? self.format.name : nil
    }
  end

end
