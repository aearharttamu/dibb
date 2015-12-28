Rails.application.config.neo4j.session_type = :server_db
Rails.application.config.neo4j.session_path = Rails.application.secrets.neo4j['server']
