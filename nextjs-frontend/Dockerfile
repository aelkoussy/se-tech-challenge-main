# Use a minimal Node.js image as the base
FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack (which manages pnpm)
RUN corepack enable

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./


# Copy the rest of your source code into the container
COPY . .

# Expose port for development
EXPOSE 5000

# Run the pnpm install when the container starts to avoid relying on host node_modules
# Start the development server (pnpm dev should start your Next.js dev server)
CMD ["sh", "-c", "pnpm install && pnpm dev"]
