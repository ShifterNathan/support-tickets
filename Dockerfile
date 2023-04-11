# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps

# Copy the init-db.sql script to the container
COPY init-db.sql /docker-entrypoint-initdb.d/