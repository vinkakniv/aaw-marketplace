#!/bin/sh
echo "Checking dist directory..."
ls -R dist
pnpm run migrate
echo "Migrating"
node dist/src/db/migrate.js
echo "Starting Server"
node dist/src/server.js
