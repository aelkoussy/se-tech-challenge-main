# Use the official Node.js image as a base
FROM node:23-alpine

# Set the working directory
WORKDIR /app

COPY package.json ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the Next.js application in development mode
CMD ["yarn", "dev"]
