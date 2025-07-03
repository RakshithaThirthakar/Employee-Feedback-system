# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port (adjust if needed)
EXPOSE 3000 3001

# Start the server
CMD ["npm", "start"]
