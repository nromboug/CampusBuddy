# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy project files
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which your app will run
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
