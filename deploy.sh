#!/bin/bash

# Add all changes in the pocketbase directory
git add pocketbase/

# Commit with the message "update"
git commit -m "pocketbase database update on linode"

# Pull latest changes from the remote repository
git fetch origin
git merge -X theirs origin master

# Resolve any merge conflicts that occurred during git pull by accepting "their" changes
git checkout --theirs .
git add pocketbase/*
git commit -m "merge changes"

# Shut down running containers
docker-compose down

# Build services
docker-compose build

# Run services in the background
docker-compose up -d
