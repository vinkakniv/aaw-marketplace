#!/bin/sh
echo "Checking dist directory..."
ls -R dist
echo "Migrating"
node dist/db/migrate.js
echo "Starting Server"
node dist/server.js
