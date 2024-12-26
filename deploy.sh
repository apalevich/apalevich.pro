#!/bin/bash

# deployment script for nginx configuration
REPO_PATH="/var/www/apalevich.pro"
NGINX_CONFIG_PATH="$REPO_PATH/infrastructure"
SITES_AVAILABLE="/etc/nginx/sites-available"
SITES_ENABLED="/etc/nginx/sites-enabled"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root"
    exit 1
fi

# Create symbolic links for the configuration
echo "Creating symbolic links..."
ln -sf "$NGINX_CONFIG_PATH/apalevich.pro.conf" "$SITES_AVAILABLE/apalevich.pro.conf"
ln -sf "$SITES_AVAILABLE/apalevich.pro.conf" "$SITES_ENABLED/apalevich.pro.conf"

# Test nginx configuration
echo "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "Configuration test successful. Reloading nginx..."
    systemctl reload nginx
    echo "Nginx reloaded successfully!"
else
    echo "Configuration test failed. Please check your nginx configuration."
    exit 1
fi
