#!/bin/bash
# rollback-nginx.sh

# Check if a git revision is provided
if [ -z "$1" ]; then
    echo "Please provide a git revision to rollback to"
    echo "Usage: $0 <revision>"
    exit 1
fi

cd /var/www/apalevich.pro
git checkout $1 infrastructure/
./deploy.sh
