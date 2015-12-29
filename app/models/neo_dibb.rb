class NeoDibb
  
  include Neo4j::ActiveNode

  property :version, type: String
  
  has_many :out, :bibliographs, type: :CONTAINS, model_class: :NeoBibliograph
  
  self.mapped_label_name = 'DiBB'

  GRAPH_SCHEMA_VERISON = '0.1'
  
  def self.root_node
    dibb = NeoDibb.create( { version: GRAPH_SCHEMA_VERISON } )
    dibb.save!
    dibb
  end
    
  def generate
    
    # TODO what happens if the DB is modified during this process?
    # we have to screen the UI while running this
    
    neo_bibliograph = NeoBibliograph.create( { created_at: Time.now } )
    neo_bibliograph.generate
    self.bibliographs << neo_bibliograph
  
    # save the entire graph
    neo_bibliograph.save              
  end

end
