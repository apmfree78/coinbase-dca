
#!/bin/bash

# Go to your repository directory if not already in it
cd /home/apmfree78/coinbase-dca

# Add all changes in the pocketbase directory
git add pocketbase/*

# Commit with the message "update"
git commit -m "pocketbase database update on linode"

# Pull latest changes from the remote repository
git pull origin master

# Resolve any merge conflicts that occurred during git pull by accepting "their" changes
git checkout --theirs .

# Go to your docker-compose directory if it's not the same as your repo directory
# cd /path/to/your/docker-compose

# Shut down running containers
docker-compose down

# Build services
docker-compose build

# Run services in the background
# docker-compose up -d
