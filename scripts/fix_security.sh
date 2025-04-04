#!/bin/bash

echo "🔒 Fixing security vulnerabilities..."

# Run npm audit fix with force to address all issues
npm audit fix --force

echo "✅ Security fixes applied"
