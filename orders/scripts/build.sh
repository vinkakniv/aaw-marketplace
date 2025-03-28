#!/bin/bash
# File: scripts/build.sh

# Compile TypeScript
tsc && tsc-alias

# Create directory if not exists
mkdir -p dist/src/docs

# Copy YAML file
cp src/docs/orders-api.yaml dist/src/docs/

echo "Build completed successfully"