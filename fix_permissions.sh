#!/bin/bash

echo "🔧 Fixing script permissions..."

# Make all scripts in the root directory executable
chmod +x *.sh

# Make sure scripts directory exists
mkdir -p scripts

# Make all scripts in the scripts directory executable 
chmod +x scripts/*.sh 2>/dev/null

echo "✅ All scripts are now executable"
echo "🚀 You can now run:"
echo "   ./scripts/fix_startup_issues.sh"
