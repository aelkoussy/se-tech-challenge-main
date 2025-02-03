# Interview Assignment

Thank you for taking the time to review my assignment!

## Overview

For this assignment, I built a demo application using the stack I’m most comfortable with—Rails for the backend and React/Next.js for the frontend. I have experience with other languages and frameworks (e.g., Java/Spring Boot and Vue/Nuxt), but I chose my familiar stack to deliver the best solution within the limited timeframe.

This assignment was targeted toward a Senior Backend Software Engineer role, so the focus is on the backend. However, I also implemented a polished frontend to showcase the complete application.

## Stack

- **Database:** PostgreSQL
- **Backend:** Ruby on Rails
- **Search:** Meilisearch (an easy-to-use alternative to ElasticSearch and Solr)
- **Frontend:** React / Next.js

## Features

- **Backend:** A robust API built with Rails.
- **Search:** Full-text search powered by Meilisearch.
- **Frontend:** A visually appealing UI built with React/Next.js.
- **Testing:** Rails RSpec tests for backend endpoints. _(Note: Frontend testing is minimal; in a full project, I would add React Testing Library tests and additional end-to-end tests as needed.)_

## Setup and Running the Project

This project is containerized using Docker. To start the application along with its dependencies and seed the database and search index, run:

```bash
docker-compose up --build
```

After the containers start, you can access the app at [http://localhost:5000](http://localhost:5000).

## Running Tests

To execute the Rails RSpec tests, run the following command:

```bash
docker-compose exec rails-app bundle exec rspec
```

---

If you have any questions or need further details, please let me know. Enjoy exploring the app!
