class NeoTitle
  
  include Neo4j::ActiveNode
  
  property :name, type: String
  property :serial_title, type: String
  property :serial_volume_as_appears, type: String
  property :serial_issue_as_appears, type: String
  property :is_review, type: String
  
  self.mapped_label_name = 'Title'

end
