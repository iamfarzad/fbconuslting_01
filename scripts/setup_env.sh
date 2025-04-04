#!/bin/bash

echo "🔧 Setting up environment variables..."

# Create a comprehensive .env file based on .env.example with suitable defaults
cat > .env << 'EOL'
# API Keys
GEMINI_API_KEY=AIza_example_key_replace_with_your_actual_key
OPENAI_API_KEY=sk-xxxx_example_key_replace_with_your_actual_key

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXXXXX-X
NEXT_PUBLIC_VERCEL_ANALYTICS=false

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Feature flags
NEXT_PUBLIC_ENABLE_3D_MODELS=true
NEXT_PUBLIC_ENABLE_VOICE_CHAT=true
NEXT_PUBLIC_ENABLE_GEMINI=true

# Deployment
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Rate limiting
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW=60
EOL

echo "✅ Environment variables setup complete"
echo "⚠️ NOTE: You need to replace the placeholder API keys with your actual keys in the .env file"
echo "⚠️ For GEMINI_API_KEY, use a key in the format 'AIza...' from the Google AI Studio"