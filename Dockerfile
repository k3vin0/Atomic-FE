FROM node:latest

WORKDIR /app

# Set the PORT environment variable (Cloud Run uses this by default)
ENV PORT=8080

COPY package*.json ./

RUN npm install

COPY . .

# Build the production version of the app
RUN npm run build

# Install a lightweight static server to serve the production build
RUN npm install -g serve

# Expose the port the app runs on (optional, for documentation)
EXPOSE 8080

# Serve the production build using the port defined in the ENV variable
CMD ["serve", "-s", "dist", "-l", "8080"]