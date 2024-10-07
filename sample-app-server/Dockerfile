# Use Ubuntu 20.04 as the base image
FROM ubuntu:20.04

# Install Node.js and MongoDB
RUN apt-get update && \
    apt-get install -y curl gnupg wget && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    mkdir -p /data/db && \
    apt-get clean

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the ports
EXPOSE 3000 27017

# Start MongoDB and the Node.js application
CMD ["bash", "-c", "mongod --bind_ip 127.0.0.1 --fork --logpath /var/log/mongod.log && npm start"]

