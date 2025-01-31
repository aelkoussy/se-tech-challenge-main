# Use the official Ruby image with a version compatible with Rails 8
FROM ruby:3.3

# Set environment variables
ENV RAILS_ENV=development \
    BUNDLE_PATH=/gems

# Install Rails globally
RUN gem install rails

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Set the working directory
WORKDIR /app

# Copy the Gemfile and Gemfile.lock first (to leverage Docker caching)
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the rest of the app files
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]
