#!/bin/bash

# Add all changes
git add .

# Commit with the message "update"
git commit -m "local update"

# Pull latest changes from the remote repository
git fetch origin
git merge -X theirs origin master

# Resolve any merge conflicts that occurred during git pull by accepting "their" changes
git checkout --theirs .
git add .
git commit -m "merge changes"

# Shut down running containers
docker-compose down

# Build services
docker-compose build
