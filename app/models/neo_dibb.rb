class NeoDibb
  
  include Neo4j::ActiveNode

  property :version, type: String
  
  has_many :out, :bibliographs, type: :CREATED, model_class: :NeoBibliograph
  
  self.mapped_label_name = 'DiBB'

  GRAPH_SCHEMA_VERISON = '0.1'
  
  def self.root_node
    NeoDibb.find_or_create_by( { version: GRAPH_SCHEMA_VERISON } )
  end
      
  def generate( bibliograph )
    
    # TODO what happens if the DB is modified during this process?
    # we have to screen the UI while running this
    
    neo_bibliograph = NeoBibliograph.create( bibliograph.node_properties )
    neo_bibliograph.generate
    self.bibliographs << neo_bibliograph
  end
  
end
