#!/bin/sh
echo "START SCRIPt"
# ls dist
# # Run migrations
# yarn migration:run

# Start the application
exec yarn start:prod
