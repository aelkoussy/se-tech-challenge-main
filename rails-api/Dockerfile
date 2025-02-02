# Use the official Ruby image with a version compatible with Rails 8
FROM ruby:3.3

# Set environment variables
ENV RAILS_ENV=development \
    BUNDLE_PATH=/gems \
    BUNDLE_APP_CONFIG=/gems/.bundle \
    BUNDLE_CACHE_ALL=true

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Install Rails globally if needed (optional, as you can include it in your Gemfile)
RUN gem install rails

# Set the working directory
WORKDIR /app

# Cache bundler dependencies by copying Gemfiles first
COPY Gemfile Gemfile.lock ./

# Pre-configure bundler to use deployment mode if desired and install gems
RUN bundle config set --local without 'production' && \
    bundle install --jobs=4 --retry=3

# Copy the rest of the app files
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000
