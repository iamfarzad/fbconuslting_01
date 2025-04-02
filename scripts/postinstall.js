#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Running post-installation setup...');

// Make scripts executable
console.log('\n📝 Making scripts executable...');
try {
  execSync('chmod +x scripts/*.js', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️  Could not make scripts executable. If you\'re on Windows, this is expected.');
}

// Check if .env file exists
console.log('\n🔍 Checking for environment configuration...');
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📄 Creating .env file from example...');
  fs.copyFileSync(envExamplePath, envPath);
}

// Run environment checks
console.log('\n🏃 Running environment checks...');
try {
  require('./check-env.js');
} catch (error) {
  console.error('\n❌ Environment check failed:', error.message);
  console.log('\n👉 Please set up your environment variables in .env file');
}

// Final instructions
console.log(`
✅ Installation complete!

Next steps:
1. Set up your environment variables in .env file
2. Get your Gemini API key from https://makersuite.google.com/app/apikey
3. Run 'npm run dev' to start the development server

For more information, check out the README.md file.
`);
