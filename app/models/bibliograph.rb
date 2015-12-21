class Bibliograph 

  def self.test_graph
    
    # TODO write a node to the DB using neography
    neo = Neography::Rest.new
    
    node = neo.create_node( version: "0.1")
    neo.set_label(node, "DiBB")
  end


end
