FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including typescript and tsx)
RUN npm install

# Copy application source code
COPY . .

# Expose the application port
EXPOSE 5001

# Start the application
CMD ["npm", "run", "start"]
