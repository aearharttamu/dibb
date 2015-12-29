class NeoDibb
  
  include Neo4j::ActiveNode

  property :version, type: String
  
  has_many :out, :bibliographs, type: :CREATED, model_class: :NeoBibliograph
  
  self.mapped_label_name = 'DiBB'

  GRAPH_SCHEMA_VERISON = '0.1'
  
  def self.root_node
    NeoDibb.find_or_create_by( { version: GRAPH_SCHEMA_VERISON } )
  end
  
  def self.run_graph
    neo_dibb = NeoDibb.root_node
    neo_dibb.generate
  end  
    
  def generate
    
    # TODO what happens if the DB is modified during this process?
    # we have to screen the UI while running this
    
    neo_bibliograph = NeoBibliograph.create( { created_at: Time.now } )
    neo_bibliograph.generate
    self.bibliographs << neo_bibliograph
  end
  
end
