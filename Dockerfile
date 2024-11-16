# Use Node 20 as the base image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json for both frontend and backend
COPY ./frontend/package*.json ./frontend/
COPY ./backend/package*.json ./backend/

# Install dependencies for both frontend and backend
RUN npm install --prefix ./frontend
RUN npm install --prefix ./backend

# Copy the rest of the application code for frontend and backend
COPY ./frontend ./frontend
COPY ./backend ./backend

# Build the frontend application (in the frontend directory)
RUN npm run build --prefix ./frontend

# Remove dev dependencies for production (optional)
RUN npm install --prefix ./frontend --omit=dev

# Install the 'serve' package globally to serve the frontend app
RUN npm install -g serve

# Expose port 3000 for the frontend
EXPOSE 3000

# Serve the app from the frontend's dist directory
CMD ["serve", "-s", "./frontend/dist", "-l", "3000"]
