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
COPY --from=build /app/src/common/migrations ./dist/common/migrations
COPY --from=build /app/src/common/migrations ./src/common/migrations
COPY package.json yarn.lock ./

COPY --from=build /app/startup.sh ./
RUN chmod +x ./startup.sh

# Expose port 3000 for the web server
EXPOSE 3000

# Start the application using the startup script
CMD ["./startup.sh"]

