#!/bin/bash

# Exit on any error
set -e

echo "Starting AI-MolVE..."

# Wait for database to be ready (with timeout)
echo "Waiting for database to be ready..."
timeout=60
counter=0
while ! pg_isready -h $PGHOST -p $PGPORT -U $PGUSER > /dev/null 2>&1; do
  if [ $counter -ge $timeout ]; then
    echo "Database connection timeout after ${timeout} seconds"
    exit 1
  fi
  echo "Database not ready, waiting 2 seconds... ($counter/$timeout)"
  sleep 2
  counter=$((counter + 2))
done

echo "Database is ready!"

# Push database schema
echo "Pushing database schema..."
npm run db:push

echo "Database schema updated successfully!"

echo "Starting application server..."
# Start the application
exec npm start