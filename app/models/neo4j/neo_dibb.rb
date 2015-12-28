class NeoDibb
  
  include Neo4j::ActiveNode

  GRAPH_SCHEMA_VERISON = '0.1'
  
  def self.root_node
    dibb = NeoDibb.new( { version: GRAPH_SCHEMA_VERISON } )
    dibb.save!
    dibb
  end
    
  def generate
    
    # TODO what happens if the DB is modified during this process?
    # we have to screen the UI while running this
    
    neo_bibliograph = NeoBibliograph.new( { created_at: self.created_at } )
    neo_bibliograph.generate
    neo_bibliograph.save              
  end

end
