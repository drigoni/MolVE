# Use Node.js LTS version based on Debian
FROM node:20

# Install necessary packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-venv \
    make \
    g++ \
    gcc \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    librsvg2-dev \
    postgresql-client \
    pkg-config \
    libfreetype6-dev \
    libpng-dev \
    gfortran \
    libopenblas-dev \
    liblapack-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy application code
COPY . .

# Create a virtual environment
RUN python3 -m venv /venv

# Activate the virtual environment and install Python dependencies
RUN /venv/bin/pip install --no-cache-dir "numpy<2" pandas pillow
RUN /venv/bin/pip install --no-cache-dir matplotlib cairocffi

# Set environment variables to use the virtual environment
ENV VIRTUAL_ENV=/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install all Node.js dependencies (including dev dependencies for build)
RUN npm install

# Build the application
RUN npm run build

# Remove dev dependencies after build
# RUN npm ci --only=production && npm cache clean --force

# Make the script executable
RUN chmod +x /app/initial_configs/start.sh

# Start the application
CMD ["./initial_configs/start.sh"]