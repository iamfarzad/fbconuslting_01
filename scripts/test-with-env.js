#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.blue}🧪 Running tests with test environment...${colors.reset}\n`);

// Check for test environment file
const testEnvPath = path.join(process.cwd(), '.env.test');
if (!fs.existsSync(testEnvPath)) {
  console.error(`${colors.bright}${colors.yellow}⚠️  No .env.test file found. Creating one from .env.example...${colors.reset}`);
  
  const envExamplePath = path.join(process.cwd(), '.env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, testEnvPath);
  } else {
    console.error(`${colors.bright}${colors.yellow}❌ No .env.example file found. Please create .env.test manually.${colors.reset}`);
    process.exit(1);
  }
}

try {
  // Run tests with test environment
  console.log(`${colors.cyan}Running Jest with test environment...${colors.reset}\n`);
  
  execSync('cp .env.test .env.local', { stdio: 'inherit' });
  execSync('npx jest', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      GEMINI_API_KEY: 'ABCD1234EFGH5678IJKL', // Test API key
    }
  });

  console.log(`\n${colors.bright}${colors.green}✅ All tests completed successfully!${colors.reset}`);
} catch (error) {
  console.error(`\n${colors.bright}${colors.yellow}❌ Tests failed with error:${colors.reset}`, error.message);
  process.exit(1);
} finally {
  // Clean up
  try {
    fs.unlinkSync(path.join(process.cwd(), '.env.local'));
  } catch (e) {
    // Ignore cleanup errors
  }
}
