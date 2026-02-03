#!/bin/bash

# Exit on any error
set -e

echo "Starting Molecular Evaluation Platform..."

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! pg_isready -h $PGHOST -p $PGPORT -U $PGUSER; do
  echo "Database not ready, waiting 2 seconds..."
  sleep 2
done

echo "Database is ready!"

# Push database schema
echo "Pushing database schema..."
npm run db:push

echo "Starting application server..."
# Start the application
npm start