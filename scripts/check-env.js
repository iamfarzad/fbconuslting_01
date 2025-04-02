#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define required environment variables
const REQUIRED_ENV_VARS = {
  GEMINI_API_KEY: 'Required for chat functionality. Get it from https://makersuite.google.com/app/apikey',
};

// Define optional environment variables with defaults
const OPTIONAL_ENV_VARS = {
  NEXT_PUBLIC_APP_URL: {
    default: 'http://localhost:3000',
    description: 'URL where the app is hosted',
  },
  NEXT_PUBLIC_VERCEL_ANALYTICS: {
    default: 'false',
    description: 'Enable/disable Vercel Analytics',
  },
  RATE_LIMIT_REQUESTS: {
    default: '10',
    description: 'Number of requests allowed per window',
  },
  RATE_LIMIT_WINDOW: {
    default: '60',
    description: 'Time window in seconds for rate limiting',
  },
};

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✨ Created .env file from .env.example');
    } else {
      fs.writeFileSync(envPath, '');
      console.log('✨ Created empty .env file');
    }
  }

  return fs.readFileSync(envPath, 'utf8');
}

function parseEnvFile(content) {
  const envVars = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^#\s=]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1];
      const value = match[2].replace(/["']/g, '').trim();
      envVars[key] = value;
    }
  });
  return envVars;
}

function checkRequiredVars(envVars) {
  let missingVars = [];
  
  for (const [key, description] of Object.entries(REQUIRED_ENV_VARS)) {
    if (!envVars[key]) {
      missingVars.push({ key, description });
    }
  }

  return missingVars;
}

function checkOptionalVars(envVars) {
  let missingOptionalVars = [];
  
  for (const [key, config] of Object.entries(OPTIONAL_ENV_VARS)) {
    if (!envVars[key]) {
      missingOptionalVars.push({
        key,
        default: config.default,
        description: config.description,
      });
    }
  }

  return missingOptionalVars;
}

function main() {
  console.log('🔍 Checking environment configuration...\n');

  // Check and read .env file
  const envContent = checkEnvFile();
  const envVars = parseEnvFile(envContent);

  // Check required variables
  const missingRequired = checkRequiredVars(envVars);
  const missingOptional = checkOptionalVars(envVars);

  // Report results
  if (missingRequired.length > 0) {
    console.error('\n❌ Missing required environment variables:');
    missingRequired.forEach(({ key, description }) => {
      console.error(`   ${key}: ${description}`);
    });
    process.exit(1);
  }

  if (missingOptional.length > 0) {
    console.warn('\n⚠️  Missing optional environment variables (using defaults):');
    missingOptional.forEach(({ key, default: defaultValue, description }) => {
      console.warn(`   ${key}: ${description}`);
      console.warn(`   Default value: ${defaultValue}\n`);
    });
  }

  // Validate Gemini API Key format if present
  if (envVars.GEMINI_API_KEY) {
    if (!envVars.GEMINI_API_KEY.match(/^[A-Za-z0-9-_]{20}$/)) {
      console.error('\n❌ Invalid GEMINI_API_KEY format. Please check your API key.');
      process.exit(1);
    }
  }

  console.log('\n✅ Environment configuration is valid!');
}

// Run the checks
main();
