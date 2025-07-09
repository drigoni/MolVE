# Use Node.js LTS version
FROM node:20-alpine

RUN apk add python3 make g++ gcc
RUN apk add musl-dev cairo-dev cairo jpeg-dev pango-dev giflib-dev 
RUN apk add librsvg-dev postgresql-client pkgconfig freetype-dev libpng-dev 
RUN apk add gfortran openblas-dev lapack-dev

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

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Build the application
RUN npm run build

# Remove dev dependencies after build
#RUN npm ci --only=production && npm cache clean --force
RUN npm ci && npm cache clean --force

# Make the script executable
RUN chmod +x /app/initial_configs/start.sh

# Start the application
CMD ["./initial_configs/start.sh"]
