#!/bin/sh

# Copy .env.example to .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  cp .env.example .env.local
fi

# Run the main command
exec "$@"