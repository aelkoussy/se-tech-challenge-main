# Use minimal Node.js image
FROM node:23-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first (to leverage caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies without symlink issues
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Ensure node_modules symlinks work inside the container
RUN pnpm rebuild

# Expose port for development
EXPOSE 5000

# Start Next.js in development mode
CMD ["pnpm", "dev"]
