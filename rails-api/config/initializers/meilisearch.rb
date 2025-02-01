MeiliSearch::Rails.configuration = {
  meilisearch_url: ENV.fetch("MEILISEARCH_HOST", "http://meilisearch:7700"), # Use the service name defined in docker-compose
  meilisearch_api_key: ENV.fetch("MEILISEARCH_API_KEY", "your_master_key")
}
