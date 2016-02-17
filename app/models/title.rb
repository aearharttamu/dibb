class Title < ActiveRecord::Base
  
  belongs_to :publisher
  has_many :citations  
  
  before_destroy :remove_refs
  
  def node_properties
    { }
  end
  
  def remove_refs
    self.citations.each { |citation|
      citation.title = nil
      citation.save
    }
  end
  
end