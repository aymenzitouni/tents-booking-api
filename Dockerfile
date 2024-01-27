# Dockerfile.prod

# Use the official Node.js 18.16.1 image from Docker Hub
FROM node:18.16.1-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install all dependencies, including dev dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN yarn build

# Start a new stage from scratch
FROM node:18.16.1-alpine

WORKDIR /app

# Copy only the production dependencies and compiled code from the previous stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json yarn.lock ./

# Expose port 3000 for the web server
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]