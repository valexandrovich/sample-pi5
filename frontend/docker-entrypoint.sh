#!/bin/sh
set -e

# Default value if not set
APP_PATH=${APP_PATH:-sample}

# Substitute environment variables in nginx config
envsubst '${APP_PATH}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Execute the main command
exec "$@"

