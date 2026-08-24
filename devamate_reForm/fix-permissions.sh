#!/bin/bash
# Fix permissions for .next directory
echo "Fixing permissions for .next directory..."
sudo chown -R $(whoami) .next 2>/dev/null || sudo rm -rf .next
echo "Permissions fixed! You can now run 'npm run dev'"

