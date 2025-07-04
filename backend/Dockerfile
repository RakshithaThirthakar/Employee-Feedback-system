# Use a lightweight Python image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy only requirements file first to leverage Docker caching
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the entire project into the container
COPY . .

# Set environment variables
ENV PORT=5000

# Expose the port the app runs on
EXPOSE 5000

# Start the Flask app from the root (where app.py is)
CMD ["python", "app.py"]
