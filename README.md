# Tents-Booking Application Setup Guide

Welcome to the setup guide for our Tents-Booking application. This guide will walk you through the process of getting the application up and running on your local machine using Docker.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker: [Get Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to set up the application:

### Step 1: Clone the Repository

Clone the application repository from GitHub (or your chosen source) to your local machine:

```bash
git clone https://github.com/aymenzitouni/tents-booking-api
cd tents-booking-api
```

### Step 2: Environment Configuration

Make a copy of the .env.example file and rename it to .env:\

```bash
cp .env.example .env
```

Open the .env file and fill in the necessary environment variables. These variables are essential for configuring the application correctly.

### Step 4: Running the Application

With the Docker image built, you can now run the application:

```bash
docker-compose up
```

This command will start the containers as defined in your docker-compose.yml file.

### Step 5: Accessing the Application

Once the application is running, you can access the API documentation:

API Documentation: http://localhost:3000/api/v1/docs
The API documentation provides detailed information about the available endpoints, their parameters, and expected responses.
