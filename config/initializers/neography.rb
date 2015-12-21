# these are the default values:
Neography.configure do |config|
  config.protocol             = ENV['NEO4J_PROTOCOL']
  config.server               = ENV['NEO4J_SERVER']
  config.port                 = ENV['NEO4J_PORT']
  config.username             = ENV['NEO4J_USERNAME']
  config.password             = ENV['NEO4J_PASSWORD']
end
