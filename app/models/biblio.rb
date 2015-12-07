class Biblio < ActiveRecord::Base

  def self.list_all
    biblios = Biblio.all    
    biblios.map { |biblio| biblio.obj }
  end
  
  def obj
    {
      id: self.id,
      title: self.title,
      genre: self.genre,
      date: self.date,
      provenance: self.provenance,
      pubnumber: self.pubnumber    
    }    
  end


end
